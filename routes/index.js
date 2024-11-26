var express = require("express");
const { getBooks } = require("../server");
var router = express.Router();

const USER_ID = 3;

router.get("/", async function (req, res, next) {
  const books = await getBooks(USER_ID);
  // TODO: instead of slicing maybe get most wishlisted book
  // or by reservations amount idk?
  const recommendations = books.slice(0, 6);

  res.render("index", {
    books,
    recommendations,
  });
});

module.exports = router;