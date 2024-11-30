var express = require("express");
const { getBooks } = require("../server");
var router = express.Router();

const USER_ID = 3;

router.get("/", async function (req, res, next) {
  const { query } = req.query;
  const books = await getBooks(USER_ID, query);

  res.render("search", {
    books,
  });
});

module.exports = router;
