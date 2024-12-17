const { getList, ListMedia, getBooks } = require("./server");

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

test("fetch reservations unresolved", async () => {
  var reservations = await getList(3, "reservations");
  reservations[0]["dateEntered"] = "2024-11-16T00:00:00.000Z";
  expect(reservations[0]).toBe({
    author: "Matt Ridley",
    dateEntered: "2024-11-16T00:00:00.000Z",
    description:
      "When government analyst Kate Halloran stumbles upon a classified file that wasn’t meant for her eyes, she’s pulled into a conspiracy that spans continents.",
    id: 1,
    image: "/images/books/how-innovation-works.jpg",
  });
});

// test('fetch media availability', () => {
//     const item = getSingle(1);
//     expect(toString(item)).toBe("[object Undefined]");
// });
