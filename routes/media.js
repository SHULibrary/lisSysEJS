var express = require("express");
const { getBook, editMedia } = require("../server");
var router = express.Router();

/* GET media page. */

router.get('/', async function(req, res, next) {
  if (!req.session.user || req.session.user == null){
    res.render('login', { title: 'Express' })
  }
  else {
    const { id } = req.query;
    var book = await getBook(id, req.session.user.id);
    if (book.image == "") book.image = "images/books/placeholder.png";
    if (book.length > 0) {
      res.render('media', { book: book[0], user: req.session.user });
    }
  }
  
});

router.post("/", async function (req, res, next) {
  const { name, description, author, numAvail, numOf, mediaID } = req.body;
  try {
    const success = await editMedia(name, description, author, numAvail, numOf, mediaID);
    res.send({ success });
  } catch {
    res.send({ success: false });
    console.log("FAIL");
  }
});

module.exports = router;