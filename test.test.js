
const express = require("express")
const routes = require("./routes")
const mysql = require('mysql');
const { getList, createUser } = require('./server');

var app = express();



// const conn = mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: '',
//             database: 'libdb',
//             port: '3306'
//           });
    
//           conn.connect((err) =>{
//             if(err) throw err;
//           });

// async function getList(userId, list) {
//   const query =
//     "SELECT * FROM " + list + " INNER JOIN media ON " + list + ".media_id = media.id AND " + list + ".user_id = " + userId;
//     try {
//       return new Promise((resolve, reject) => {
//         conn.query(query, function (error, results, fields) {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(results);
//           }
//         })
//       });
//     } catch (error) {
//       console.error("Error fetching :" + table, error.message);
//       throw error;
//     }
// }
// async function deleteBook() {
//   if (confirm("Are you sure you want to delete <%= book.name %>") == true) {
//     const request = await fetch("/search", {
//       method: "POST",
//       body: JSON.stringify({
//         mediaId: <%= book.id %>,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     window.location.href = "/";
//     return request;
//   }
// }

// test('fetch wishlist', () => {
//     expect(getList(3, "wishlist")).toBe();
//   });

// const conn = mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: '',
//             database: 'libdb',
//             port: '3306'
//           });
    
//           conn.connect((err) =>{
//             if(err) throw err;
//           });


// async function getSingle(id) {
//   const query =
//     "SELECT * FROM media WHERE id = ?";
//     try {
//       return new Promise((resolve, reject) => {
//         conn.query(query, [id], function (error, results, fields) {
//           if (error) {
//             reject(error);
//           } else {
//             resolve(results);
//           }
//         })
//       });
//     } catch (error) {
//       console.error("Error fetching :" + table, error.message);
//       throw error;
//     }
// }

// test('test db connection (SUCCESS)', () => {
//     const conn = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'libdb',
//         port: '3306'
//       });
    
//       var expItem = 1;

//       conn.connect((err) =>{
//         if(err) expItem = 0; //since the connection cannot be tested as a variable, I made the expected variable change if the DB does not connect
//       });
//       expect(expItem).toBe(1);
// });

test('fetch reservations unresolved', async () => {
    var reservations = await getList(3, "reservations");
    reservations[0]["dateEntered"] = '2024-11-16T00:00:00.000Z'
    expect(reservations[0]).toBe({"author": "Matt Ridley", "dateEntered": '2024-11-16T00:00:00.000Z', "description": "When government analyst Kate Halloran stumbles upon a classified file that wasn’t meant for her eyes, she’s pulled into a conspiracy that spans continents.", "id": 1, "image": "/images/books/how-innovation-works.jpg"});
});
//TEST SIGN UP
    test('should return error if any field is missing', async () => {
      expect(await createUser('', 'email@email.com', 'Username', 'Password1', 'dd/mm/yyyy', 102012)).toEqual("All fields are required.")
      });
  // test('create user function correctly', async () => {
  //   var create = await createUser('Full Name', 'email@email.com', 'Username', 'Password1', '01/01/1000', 871387);
  //   //CHANGE 'insertId' TO CURRENT NUMBER + 1 EVERY TIME THIS TEST IS RAN
  //   expect(create).toEqual({"affectedRows": 1, "changedRows": 0, "fieldCount": 0, "insertId": 13, "message": "", "protocol41": true, "serverStatus": 2, "warningCount": 3});
  // });
  //TEST ADD MEDIA
  test('should return error if any field is missing', async () => {
    expect(await addMedia('name', 'description', 'author', 'numAvail', 'numOf')).toEqual("All fields are required.")
    });
// test('create user function correctly', async () => {
//   var create = await createUser('Full Name', 'email@email.com', 'Username', 'Password1', '01/01/1000', 871387);
//   expect(create).toEqual({"affectedRows": 1, "changedRows": 0, "fieldCount": 0, "insertId": 13, "message": "", "protocol41": true, "serverStatus": 2, "warningCount": 3});
// });