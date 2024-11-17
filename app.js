var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//var session = require('express-session');
//var hash = require('pbkdf2-password')();
var sqlite3 = require('sqlite3').verbose();

var indexRouter = require("./routes/index");
var indoxRouter = require("./routes/login");
var indox2Router = require("./routes/signUp");
var wishlistRouter = require("./routes/wishlist");
var usersRouter = require("./routes/users");
export var users;
export var books;
export var discs;
export var other;

var app = express();

const db = new sqlite3.Database('./data/libData.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

async function getUsers() {
  const query = 'SELECT * FROM users';
  try {
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
}

async function getBooks() {
  const query = 'SELECT * FROM books';
  try {
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching books:', error.message);
    throw error;
  }
}

async function getDiscs() {
  const query = 'SELECT * FROM discs';
  try {
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching discs:', error.message);
    throw error;
  }
}

async function getOther() {
  const query = 'SELECT * FROM other';
  try {
    return new Promise((resolve, reject) => {
      db.all(query, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching other:', error.message);
    throw error;
  }
}

(async() => {
  users = await getUsers()
  console.log(users)
})()

(async() => {
  users = await getBooks()
  console.log(users)
})()

(async() => {
  users = await getDiscs()
  console.log(users)
})()

(async() => {
  users = await getOther()
  console.log(users)
})()

// app.use(express.urlencoded())
// app.use(session({
//   resave: false, // don't save session if unmodified
//   saveUninitialized: false, // don't create session until something stored
//   secret: 'ancientTomes'
// }));

// hash({ password: 'foobar' }, function (err, pass, salt, hash) {
//   if (err) throw err;
//   // store the salt & hash in the "db"
//   users.tj.salt = salt;
//   users.tj.hash = hash;
// });

// app.use(function(req, res, next){
//   var err = req.session.error;
//   var msg = req.session.success;
//   delete req.session.error;
//   delete req.session.success;
//   res.locals.message = '';
//   if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
//   if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
//   next();
// });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", indoxRouter);
app.use("/signUp", indox2Router);
app.use("/wishlist", wishlistRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
