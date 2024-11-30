var express = require('express');
const { authUser } = require('../server');
var router = express.Router();

/* GET sign in page. */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post("/", async function(req, res, next) {
  const { username, password} = req.body;
  const users = await authUser(username, password)

  if (users.length > 0) {
    res.redirect(301, "/")
  } else {
    res.redirect(301, "/login?error=true")
  }
})

module.exports = router;