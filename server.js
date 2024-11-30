var express = require("express");
var sqlite3 = require("sqlite3").verbose();

var app = express();

const db = new sqlite3.Database("./data/libData.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

async function getItems(table) {
  const query = "SELECT * FROM " + table;
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
    console.error("Error fetching :" + table, error.message);
    throw error;
  }
}

async function getBooks() {
  const query = "SELECT * FROM book INNER JOIN media ON book.id = media.id";

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
    console.error("Error fetching :" + table, error.message);
    throw error;
  }
}

function test() {
  console.log("hi here");
}

module.exports = { getItems, getBooks, test };