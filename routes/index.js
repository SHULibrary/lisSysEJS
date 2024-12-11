var express = require("express");
var router = express.Router();
var { getBooks } = require("../server")

router.get("/", async function (req, res, next) {
  var books = await getBooks(req.session.user.id);
  // TODO: instead of slicing maybe get most wishlisted book
  const recommendations = books.slice(0, 6);
  if (!req.session.user || req.session.user == null){
    res.render('login', { title: 'Express' })
  } 
  else {
    res.render("index", {
      books,
      recommendations,
      user: req.session.user
    });
  }
  
});

module.exports = router;