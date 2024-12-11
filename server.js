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
    query += "WHERE media.name LIKE ? OR media.author LIKE ?";
  }

  try {
    return new Promise((resolve, reject) => {
      conn.query(query, args, function (error, results, fields) {
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

async function getList(userId, list) {
  const query =
    "SELECT * FROM " + list + " WHERE user_id = " + userId;
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

async function isListed(list, userId, mediaId) {
  const query = "SELECT * FROM " + list + " WHERE user_id = ? AND media_id = ?";
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

async function ListMedia(list, userId, mediaId) {
  let query = "INSERT INTO " + list + " (media_id, user_id) VALUES (?, ?)";
  let exists = await isListed(list, userId, mediaId);
  
  if (exists.length > 0) {
    query = "DELETE FROM " + list + " WHERE media_id = ? AND user_id = ?";
  }

  conn.query(query, [mediaId, userId]);
  return !(exists.length > 0);
}

async function authUser(username, password) {
  const query =
    "SELECT * FROM users WHERE username = ? AND password = ?";
    try {
      return new Promise((resolve, reject) => {
        conn.query(query, [username, password], function (error, results, fields) {
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

async function createUser(name, email, username, password, dob, phone) {
  const query =
    "INSERT INTO users (name, email, username, password, DOB, phone) VALUES (?, ?, ?, ?, ?, ?)";
    try {
      return new Promise((resolve, reject) => {
        conn.query(query, [name, email, username, password, dob, phone], function (error, results, fields) {
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
async function getBook(id, userID) {
  const query =
  `SELECT 
  media.*, 
  CASE 
      WHEN wishlist.media_id IS NOT NULL THEN 1
      ELSE 0
  END AS wishlisted
FROM 
  media
LEFT JOIN 
  wishlist 
ON 
  media.id = wishlist.media_id 
  AND wishlist.user_id = ?
WHERE 
  media.id = ?`;
    try {
      return new Promise((resolve, reject) => {
        conn.query(query, [userID, id], function (error, results, fields) {
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

async function editMedia(name,description,author,numAvail,numOf,mediaID) {
  const query =
    "UPDATE `media` SET `name` = ?, `description` = ?, `author` = ?, `numberAvail` = ?, `numberOf` = ? WHERE `media`.`id` = ?";
    try {
      return new Promise((resolve, reject) => {
        conn.query(query, [name,description,author,numAvail,numOf,mediaID], function (error, results, fields) {
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

async function addMedia(name,description,author,numAvail,numOf) {
  const query =
    "INSERT INTO `media` SET `name` = ?, `description` = ?, `author` = ?, `numberAvail` = ?, `numberOf` = ?, `dateEntered` = ?, `image` = '/images/books/placeholder.png'";
    
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    try {
      return new Promise((resolve, reject) => {
        conn.query(query, [name,description,author,numAvail,numOf,formattedDate], function (error, results, fields) {
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

async function deleteMedia(mediaID) {
  const queries = [
    `DELETE FROM wishlist WHERE media_id = ?`, `DELETE FROM reservations WHERE media_id = ?`, `DELETE FROM checkedout WHERE media_id = ?`, `DELETE FROM media WHERE id = ?`
  ];
  queries.forEach(query => {
    try {
      return new Promise((resolve, reject) => {
        conn.query(query, [mediaID], function (error, results, fields) {
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
  });
}

module.exports = { getItems, getBooks, getList, ListMedia, authUser, createUser, getBook, editMedia, deleteMedia, addMedia };
