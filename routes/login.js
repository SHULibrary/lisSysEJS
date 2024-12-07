var express = require('express');
var session = require('express-session');
var app = express();
const { authUser } = require('../server');
var router = express.Router();

/* GET sign in page. */

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post("/", async function(req, res, next) {
  const { username, password} = req.body;
  const users = await authUser(username, password);
  const user = { ...users[0] };

  if (users.length > 0) {
    app.use(
      session({
        secret: 'baloney and ch33se', 
        resave: false,
        saveUninitialized: true, 
        cookie : { secure : false, maxAge : 3600000, loggedIn : false, user : user }
      })
    );
    app.use(express.json());
    

    res.redirect(301, "/")
  } else {
    res.redirect(301, "/login?error=true")
  }
})

module.exports = router;