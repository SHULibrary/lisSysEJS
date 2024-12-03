var express = require("express");
const { getBook, editMedia } = require("../server");
var router = express.Router();

/* GET media page. */

router.get('/', async function(req, res, next) {
    const { id } = req.query;
    var book = await getBook(id, 3);
    if (book.length > 0) {
      //console.log(book.image);
      res.render('media', { book: book[0] });
    }
  });

  router.post("/", async function (req, res, next) {
    const { name, description, author, mediaID } = req.body;
    try {
      const success = await editMedia(name, description, author, mediaID);
      res.send({ success });
    } catch {
      res.send({ success: false });
    }
  });

  module.exports = router;