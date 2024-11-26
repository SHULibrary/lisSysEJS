var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
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

async function getBooks(userId) {
  const query = `
    SELECT 
      book.*,
      media.*,
      CASE 
        WHEN wishlist.mediaID IS NOT NULL THEN 1
        ELSE 0
      END as wishlisted
    FROM book 
    INNER JOIN media ON book.id = media.id
    LEFT JOIN wishlist ON media.id = wishlist.mediaID AND wishlist.userID = ?
  `;

  try {
    return new Promise((resolve, reject) => {
      db.all(query, [userId], (err, rows) => {
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

async function getWishlist(userId) {
  const query =
    "SELECT * FROM wishlist INNER JOIN media ON wishlist.mediaID = media.id INNER JOIN book ON media.id = book.id WHERE wishlist.userID = ?";

  try {
    return new Promise((resolve, reject) => {
      db.all(query, [userId], (err, rows) => {
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

async function isWishlisted(userId, mediaId) {
  const query = "SELECT * FROM wishlist WHERE userID = ? AND mediaID = ?";

  try {
    const rows = new Promise((resolve, reject) => {
      db.all(query, [userId, mediaId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    return (await rows).length;
  } catch (error) {
    console.error("Error fetching :" + table, error.message);
    throw error;
  }
}

async function wishlistMedia(userId, mediaId) {
  let query = "INSERT INTO wishlist (mediaID, userID) VALUES (?, ?)";

  let exists = await isWishlisted(userId, mediaId);
  if (exists) {
    query = "DELETE FROM wishlist WHERE mediaID = ? AND userID = ?";
  }

  db.run(query, [mediaId, userId]);
  return !exists;
}

module.exports = { getItems, getBooks, getWishlist, wishlistMedia };
