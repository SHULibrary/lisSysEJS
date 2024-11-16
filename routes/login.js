var express = require('express');
var router = express.Router();

/* GET sign in page. */

const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Path to your SQLite database file
const db = new sqlite3.Database('./data/libData.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Middleware to parse JSON requests
router.use(express.json());

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Query to get the user by username
  const query = 'SELECT * FROM users WHERE username = ?';
  db.get(query, [username], async (err, user) => {
    if (err) {
      console.error('Error fetching user:', err.message);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare passwords
    try {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.redirect('login', { title: 'Express' });
      }

      // Successful login
      res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error('Error during password verification:', error.message);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
});

module.exports = router;