var express = require('express');
var session = require('express-session');
var app = express();
const { authUser } = require('../server');
var router = express.Router();
var cookieParser = require('cookie-parser');

/* GET sign in page. */

router.get('/', function(req, res, next) {
  if(req.session.user) req.session.user = null;
  res.render('login', { title: 'Express' });
});

router.post("/", async function(req, res, next) {
  const { username, password } = req.body;
  const users = await authUser(username, password);
  const user = { ...users[0] };

  if (users.length > 0) {
    req.session.user = user;

    res.redirect(301, "/")
  } else {
    res.redirect(301, "/login?error=true")
  }
})

module.exports = router;