
const express = require("express")
const routes = require("./routes")
const mysql = require('mysql');
const deleteBook = require("./deleteBook");
const { getList, createUser, getSingle, addMedia, getBooks } = require('./server');

var app = express();

const USER_ID = 3;
const MEDIA_ID = 3;

test('test db connection (SUCCESS)', () => {
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'libdb',
        port: '3306'
      });
    
      var expItem = 1;

      conn.connect((err) =>{
        if(err) expItem = 0; //since the connection cannot be tested as a variable, I made the expected variable change if the DB does not connect
      });
      expect(expItem).toBe(1);
});

test("fetch wishlist", async () => {
  const wishlist = await getList(USER_ID, "wishlist");
  expect(wishlist).toEqual(expect.any(Array));
});

test("wishlist media", async () => {
  const success = await ListMedia("wishlist", USER_ID, MEDIA_ID);
  const success2 = await ListMedia("wishlist", USER_ID, MEDIA_ID);
  expect(success2).toBe(!success);
});

test("search media", async () => {
  const books = await getBooks(USER_ID, "Iron Flame");
  expect(books.length).toBe(1);
});


test('fetch reservations', async () => {
  var reservations = await getList(3, "reservations");
  expect(reservations[0]["author"]).toEqual("Matt Ridley");
});


test('fetch media availabiliy', async () => {
  var item = await getSingle(1);
  expect(item[0]["numberAvail"]).toEqual(4);
});

//THE BELOW TESTS WORK HOWEVER ARE TABBED OUT UNTIL WANTED SINCE THEY CREATE DATA IN THE DB

// //TEST SIGN UP
//     test('should return error if any field is missing', async () => {
//       expect(await createUser('', 'email@email.com', 'Username', 'Password1', 'dd/mm/yyyy', 102012)).toEqual("All fields are required.")
//       });
//       test('create user function correctly', async () => {
//         var create = await createUser('Full Name', 'email@email.com', 'Username', 'Password1', '01/01/1000', 871387);
//         expect(create["affectedRows"]).toEqual(1);
//       });
//   //TEST ADD MEDIA
//   test('should return error if any field is missing', async () => {
//     expect(await addMedia('', 'description', 'author', 'numAvail', 'numOf')).toEqual("All fields are required.")
//     });
//     test('create user function correctly', async () => {
//       var create = await addMedia('name', 'description', 'author', 'numAvail', 'numOf');
//       expect(create["affectedRows"]).toEqual(1);
//     });
  //TEST DELETE MEDIA
// describe("deleteBook function", () => {
//   let mockFetch, mockConfirm, mockLocation;

//   beforeEach(() => {
//     // Mock dependencies
//     mockFetch = jest.fn(() => Promise.resolve({ status: 200 }));
//     mockConfirm = jest.fn();
//     mockLocation = { href: "" };
//   });

//   test("should call fetch and redirect when confirmed", async () => {
//     const book = { id: 123, name: "Sample Book" };

//     // Simulate user confirming
//     mockConfirm.mockReturnValue(true);

//     // Call the function
//     await deleteBook(book, { fetch: mockFetch, confirm: mockConfirm, location: mockLocation });

//     // Assertions
//     expect(mockConfirm).toHaveBeenCalledWith("Are you sure you want to delete Sample Book");
//     expect(mockFetch).toHaveBeenCalledWith("/search", {
//       method: "POST",
//       body: JSON.stringify({ mediaId: 123 }),
//       headers: { "Content-Type": "application/json" },
//     });
//     expect(mockLocation.href).toBe("/");
//   });

//   test("should not call fetch or redirect when canceled", async () => {
//     const book = { id: 123, name: "Sample Book" };

//     // Simulate user canceling
//     mockConfirm.mockReturnValue(false);

//     // Call the function
//     await deleteBook(book, { fetch: mockFetch, confirm: mockConfirm, location: mockLocation });

//     // Assertions
//     expect(mockConfirm).toHaveBeenCalledWith("Are you sure you want to delete Sample Book");
//     expect(mockFetch).not.toHaveBeenCalled();
//     expect(mockLocation.href).toBe("");
//   });
// });
  //TEST EDIT MEDIA
  // editMedia.test.js
// const { jest } = require("@jest/globals");

// // Mock the function if it's in a module
// const toggleEditable = jest.fn();
// global.toggleEditable = toggleEditable;

// // Importing the function
// const editMedia = require("./editMedia"); // Adjust path accordingly

// describe("editMedia function", () => {
//   beforeEach(() => {
//     // Mock fetch globally
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         ok: true,
//         json: () => Promise.resolve({ success: true }),
//       })
//     );

//     // Mock DOM elements
//     document.body.innerHTML = `
//       <div id="book-title">Test Book</div>
//       <div id="book-description">Test Description</div>
//       <div id="book-author">Test Author</div>
//       <div id="numAvail">5</div>
//       <div id="numOf">10</div>
//     `;
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("sends a POST request with correct data and toggles editable", async () => {
//     await editMedia();

//     expect(global.fetch).toHaveBeenCalledWith("/media", {
//       method: "POST",
//       body: JSON.stringify({
//         name: "Test Book",
//         description: "Test Description",
//         author: "Test Author",
//         numAvail: 5,
//         numOf: 10,
//         mediaID: expect.any(String), // Replace if mediaID logic changes
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     expect(toggleEditable).toHaveBeenCalledWith(true);
//   });

//   it("handles fetch errors", async () => {
//     global.fetch.mockRejectedValueOnce(new Error("Network error"));

//     await expect(editMedia()).rejects.toThrow("Network error");

//     expect(toggleEditable).not.toHaveBeenCalled();
//   });
// });
// test('create user function correctly', async () => {
//   var create = await createUser('Full Name', 'email@email.com', 'Username', 'Password1', '01/01/1000', 871387);
//   expect(create).toEqual({"affectedRows": 1, "changedRows": 0, "fieldCount": 0, "insertId": 13, "message": "", "protocol41": true, "serverStatus": 2, "warningCount": 3});
// });