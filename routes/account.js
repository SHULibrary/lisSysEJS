var express = require("express");
const { getList, ListMedia } = require("../server");
var router = express.Router();

/* GET sign in page. */
router.get("/", async function (req, res, next) {
  if (!req.session.user || req.session.user == null){
    res.render('login', { title: 'Express' })
  }
  else {
    res.render("account");
  }
});

module.exports = router;
