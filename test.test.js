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
