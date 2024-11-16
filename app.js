var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sqlite3 = require('sqlite3').verbose();

var indexRouter = require("./routes/index");
var indoxRouter = require("./routes/login");
var indox2Router = require("./routes/signUp");
var wishlistRouter = require("./routes/wishlist");
var usersRouter = require("./routes/users");

var app = express();


// Open the SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database(path.join(__dirname, 'data', 'libData.db'), (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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
