var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sqlite3 = require('sqlite3').verbose();

var app = express();

const db = new sqlite3.Database('./data/libData.db', (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

async function getItems(table) {
  const query = 'SELECT * FROM ' + table;
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
    console.error('Error fetching :' + table, error.message);
    throw error;
  }
}

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


async function getUsers() {
  return await getItems("users");
}

async function getBooks() {
  return await getItems("book");
}

async function getDiscs() {
  return await getItems("disc");
}

async function getOthers() {
  return await getItems("other");
}

module.exports = { getUsers, getBooks, getDiscs, getOthers };