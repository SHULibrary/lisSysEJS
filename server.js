var express = require("express");
var sqlite3 = require("sqlite3").verbose();
const mysql = require('mysql');

var app = express();

var checkedOutData;
var mediaData;
var reservedData;
var usersData;
var wishlistData;



// conn.query('SELECT * FROM `checkedout`', function (error, results, fields) {
//   checkedOutData = results;  
// });

// conn.query('SELECT * FROM `media`', function (error, results, fields) {
//   mediaData = results;
// });

// conn.query('SELECT * FROM `reservations`', function (error, results, fields) {
//   reservedData = results;  
// });

// conn.query('SELECT * FROM `users`', function (error, results, fields) {
//   usersData = results;  
// });

// conn.query('SELECT * FROM `wishlist`', function (error, results, fields) {
//   wishlistData = results;  
// });

// console.log(checkedOutData);
// console.log(mediaData);
// console.log(reservedData);
// console.log(usersData);
// console.log(wishlistData);

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'libdb',
  port: '3306'
});

conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

async function getItems(table) {
  const query = "SELECT * FROM " + table;
  try {
    return new Promise((resolve, reject) => {
      conn.query(query, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      })
    });
  } catch (error) {
    console.error("Error fetching :" + table, error.message);
    throw error;
  }
}

async function getBooks(userId, search) {
  let query = `
    SELECT 
      media.*,
      CASE 
        WHEN wishlist.media_id IS NOT NULL THEN 1
        ELSE 0
      END as wishlisted
    FROM media
    LEFT JOIN wishlist ON media.id = wishlist.media_id AND wishlist.user_id = ?
  `;

  const args = [userId];
  if (search) {
    args.push(`%${search}%`);
    args.push(`%${search}%`);
    query += "WHERE media.name LIKE ? OR book.author LIKE ?";
  }

  try {
    return new Promise((resolve, reject) => {
      conn.query(query, [userId], function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      })
    });
  } catch (error) {
    console.error("Error fetching :" + table, error.message);
    throw error;
  }
}

async function getWishlist(userId) {
  const query =
    "SELECT * FROM wishlist INNER JOIN media ON wishlist.media_id = media.id";
    try {
      return new Promise((resolve, reject) => {
        conn.query(query, function (error, results, fields) {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        })
      });
    } catch (error) {
      console.error("Error fetching :" + table, error.message);
      throw error;
    }
}

async function isWishlisted(userId, mediaId) {
  const query = "SELECT * FROM wishlist WHERE user_id = ? AND media_id = ?";
  try {
    return new Promise((resolve, reject) => {
      conn.query(query, [userId, mediaId],function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      })
    });
  } catch (error) {
    console.error("Error fetching :" + table, error.message);
    throw error;
  }
}

async function wishlistMedia(userId, mediaId) {
  let query = "INSERT INTO wishlist (media_id, user_id) VALUES (?, ?)";

  let exists = await isWishlisted(userId, mediaId);
  if (exists) {
    query = "DELETE FROM wishlist WHERE media_id = ? AND user_id = ?";
  }

  conn.run(query, [mediaId, userId]);
  return !exists;
}

module.exports = { getItems, getBooks, getWishlist, wishlistMedia };
