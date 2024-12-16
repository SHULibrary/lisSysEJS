var express = require("express");
var router = express.Router();
var { getBooks } = require("../server")

router.get("/", async function (req, res, next) {
  try {
    var books = await getBooks(req.session.user.id);
    const recommendations = books.slice(0, 6);
    res.render("index", {
      books,
      recommendations,
      user: req.session.user
    });
  }
  catch {
    res.render('login', { title: 'Express' });
  }  
});

module.exports = router;