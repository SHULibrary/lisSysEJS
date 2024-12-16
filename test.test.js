const express = require("express")
const routes = require("./routes")
const mysql = require('mysql');
const { resolve } = require("path");
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

  //signUp.test.js
  //   test('should return error if any field is missing', () => {
  //     expect(signUp('', 'Email Address', 'Username', 'Password', 'Confirm Password', 'dd/mm/yyyy', 'Number')).toEqual({
  //       success: false,
  //       message: 'All fields are required.',
  //     });
  //     expect(signUp('Full Name', '', 'Username', 'Password', 'Confirm Password', 'dd/mm/yyyy', 'Number')).toEqual({
  //       success: false,
  //       message: 'All fields are required.',
  //     });
  //     expect(signUp('Full Name', 'Email Address', '', 'Password', 'Confirm Password', 'dd/mm/yyyy', 'Number')).toEqual({
  //       success: false,
  //       message: 'All fields are required.',
  //     });
  //     expect(signUp('Full Name', 'Email Address', 'Username', '', 'Confirm Password', 'dd/mm/yyyy', 'Number')).toEqual({
  //       success: false,
  //       message: 'All fields are required.',
  //     });
  //     expect(signUp('Full Name', 'Email Address', 'Username', 'Password', '', 'dd/mm/yyyy', 'Number')).toEqual({
  //       success: false,
  //       message: 'All fields are required.',
  //     });
  //     expect(signUp('Full Name', 'Email Address', 'Username', 'Password', 'Confirm Password', '', 'Number')).toEqual({
  //       success: false,
  //       message: 'All fields are required.',
  //     });
  //     expect(signUp('Full Name', 'Email Address', 'Username', 'Password', 'Confirm Password', 'dd/mm/yyyy', '')).toEqual({
  //       success: false,
  //       message: 'All fields are required.',
  //     });
  //     expect(signUp('Full Name', 'Email Address', 'Username', 'Password', 'Confirm Password', 'dd/mm/yyyy', 'Number')).toEqual({
  //     success: true,
  //     message: 'Sign-up successful!',
  //   });
  // });
