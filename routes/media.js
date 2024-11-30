var express = require("express");
const { getBook } = require("../server");
var router = express.Router();

/* GET media page. */

router.get('/', async function(req, res, next) {
    const { id } = req.query;
    const book = await getBook(id);
    if (book.length > 0) {
        res.render('media', { book: book[0] });
    }
  });
  
  module.exports = router;