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

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// (async() => {
//   var users = await getItems("users");
//   console.log(users)
//   var books = await getItems("book");
//   console.log(books)
//   var discs = await getItems("disc");
//   console.log(discs)
//   var other = await getItems("other");
//   console.log(other)
// })()

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