var express = require("express");
var router = express.Router();

router.get("/", async function (req, res, next) {
  const books = await getBooks();
  // TODO: instead of slicing maybe get most wishlisted book
  // or by reservations amount idk?
  const recommendations = books.slice(0, 6);

  res.render("index", {
    books,
    recommendations,
  });
});

module.exports = router;
