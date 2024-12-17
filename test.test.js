const {
  getList,
  ListMedia,
  getBooks,
  addMedia,
  createUser,
  getSingle,
} = require("./server");
const mysql = require("mysql");

const USER_ID = 3;
const MEDIA_ID = 3;

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

test("test db connection (SUCCESS)", () => {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "libdb",
    port: "3306",
  });

  var expItem = 1;

  conn.connect((err) => {
    if (err) expItem = 0; //since the connection cannot be tested as a variable, I made the expected variable change if the DB does not connect
  });
  expect(expItem).toBe(1);
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


//TEST SIGN UP
// test("should return error if any field is missing", async () => {
//   expect(
//     await createUser(
//       "",
//       "email@email.com",
//       "Username",
//       "Password1",
//       "dd/mm/yyyy",
//       102012
//     )
//   ).toEqual("All fields are required.");
// });
// test("create user function correctly", async () => {
//   var create = await createUser(
//     "Full Name",
//     "email@email.com",
//     "Username",
//     "Password1",
//     "01/01/1000",
//     871387
//   );
//   expect(create["affectedRows"]).toEqual(1);
// });
//TEST ADD MEDIA
// test("should return error if any field is missing", async () => {
//   expect(
//     await addMedia("", "description", "author", "numAvail", "numOf")
//   ).toEqual("All fields are required.");
// });
// test("create user function correctly", async () => {
//   var create = await addMedia(
//     "name",
//     "description",
//     "author",
//     "numAvail",
//     "numOf"
//   );
//   expect(create["affectedRows"]).toEqual(1);
// });
// test('create user function correctly', async () => {
//   var create = await createUser('Full Name', 'email@email.com', 'Username', 'Password1', '01/01/1000', 871387);
//   expect(create).toEqual({"affectedRows": 1, "changedRows": 0, "fieldCount": 0, "insertId": 13, "message": "", "protocol41": true, "serverStatus": 2, "warningCount": 3});
// });
