var express = require('express');
var router = express.Router();

/* GET sign in page. */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post("/", function(req, res, next) {
  const { username, password} = req.body;

  if (username == "bob" && password == "test") {
    res.redirect(301, "/")
  } else {
    res.redirect(301, "/login?error=true")
  }
})

module.exports = router;