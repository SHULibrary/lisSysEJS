const express = require("express")
const routes = require("./routes")
const mysql = require('mysql');
const { resolve } = require("path");

var app = express();

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'libdb',
  port: '3306'
});

conn.connect((err) =>{
  if(err) throw err;
  //console.log('Mysql Connected...');
});

async function getList(userId, list) {
  const query =
    "SELECT * FROM " + list + " INNER JOIN media ON " + list + ".media_id = media.id AND " + list + ".user_id = " + userId;
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

test('fetch wishlist', () => {
    expect(getList(3, "wishlist")).toBe();
  });