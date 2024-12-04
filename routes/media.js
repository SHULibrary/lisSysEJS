var express = require("express");
const { getBook, editMedia } = require("../server");
var router = express.Router();

/* GET media page. */

router.get('/', async function(req, res, next) {
  const { id } = req.query;
  var book = await getBook(id, 3);
  if (book.image == "") book.image = "images/books/placeholder.png";
  if (book.length > 0) {
    res.render('media', { book: book[0] });
  }
});

router.post("/", async function (req, res, next) {
  console.log("HELLO")
  const { name, description, author, numAvail, numOf, mediaID } = req.body;
  try {
    const success = await editMedia(name, description, author, numAvail, numOf, mediaID);
    console.log(success);
    res.send({ success });
  } catch {
    res.send({ success: false });
    console.log("FAIL");
  }
});

  module.exports = router;