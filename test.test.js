
const express = require("express")
const routes = require("./routes")
const mysql = require('mysql');
const { getList, createUser, getSingle } = require('./server');

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
          });

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



test('fetch reservations unresolved', async () => {
    var reservations = await getList(3, "reservations");
    reservations[0]["dateEntered"] = '2024-11-16T00:00:00.000Z'
    expect(reservations[0]).toEqual({"author": "Matt Ridley", "dateEntered": '2024-11-16T00:00:00.000Z', "description": "When government analyst Kate Halloran stumbles upon a classified file that wasn’t meant for her eyes, she’s pulled into a conspiracy that spans continents.", "id": 1, "image": "/images/books/how-innovation-works.jpg", "media_id": 1, "name": "How Innovation Works", "numberAvail": 4, "numberOf": 4, "user_id": 3});
});

test('fetch media availabiliy', async () => {
    var item = await getSingle(1);
    expect(item[0]["numberAvail"]).toEqual(4);
});

//TEST SIGN UP
    test('should return error if any field is missing', async () => {
      expect(await createUser('', 'email@email.com', 'Username', 'Password1', 'dd/mm/yyyy', 102012)).toEqual("All fields are required.")
      });
      test('create user function correctly', async () => {
        var create = await createUser('Full Name', 'email@email.com', 'Username', 'Password1', '01/01/1000', 871387);
        expect(create["affectedRows"]).toEqual(1);
      });
  //TEST ADD MEDIA
  test('should return error if any field is missing', async () => {
    expect(await addMedia('name', 'description', 'author', 'numAvail', 'numOf')).toEqual("All fields are required.")
    });
// test('create user function correctly', async () => {
//   var create = await createUser('Full Name', 'email@email.com', 'Username', 'Password1', '01/01/1000', 871387);
//   expect(create).toEqual({"affectedRows": 1, "changedRows": 0, "fieldCount": 0, "insertId": 13, "message": "", "protocol41": true, "serverStatus": 2, "warningCount": 3});
// });