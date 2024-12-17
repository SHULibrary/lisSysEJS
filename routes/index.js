var express = require("express");
var router = express.Router();
var { getBooks } = require("../server")

router.get("/", async function (req, res, next) {
  if (!req.session.user || req.session.user == null){
    res.render('login', { title: 'Express' })
  }
  else {
    var books = await getBooks(req.session.user.id);
    const recommendations = books.slice(0, 6);
    res.render("index", {
      books,
      recommendations,
      user: req.session.user
    });
  }
});

module.exports = router;