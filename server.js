var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');

var app = express();

const db = new sqlite3.Database(path.join(__dirname, 'data', 'libData.db'), (err) => {
    if (err) {
      console.error('Error opening database:', err);
    }
});

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, password, email, DOB, address, name, number } = req.body;
  
    if (!username || !password) {
      return res.status(400).send('Username and password are required.');
    }
  
    // Hash the password before storing it
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).send('Error hashing password.');
      }
  
      // Insert new user into the database
      const stmt = db.prepare('INSERT INTO users (username, password, email, DOB, address, name, phone role) VALUES (?, ?, ?, ?, ?, ?, ?, c)');
      stmt.run(username, hashedPassword, function(err) {
        if (err) {
          return res.status(500).send('Error inserting user into database.');
        }
        res.status(201).send('User registered successfully.');
      });
      stmt.finalize();
    });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).send('Username and password are required.');
    }
  
    // Retrieve the user from the database
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
      if (err) {
        return res.status(500).send('Error querying database.');
      }
  
      if (!user) {
        return res.status(404).send('User not found.');
      }
  
      // Compare the password with the hashed password
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          return res.status(500).send('Error comparing passwords.');
        }
  
        if (match) {
          res.status(200).send('Login successful!');
        } else {
          res.status(401).send('Incorrect password.');
        }
      });
    });
  });
  