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
 

  if (users.length > 0) {
    app.use(
      session({
        secret: 'baloney and ch33se', 
        resave: false,
        saveUninitialized: true, 
      })
    );
    app.use(express.json());
    
    app.post('/set-session', (req, res) => {
      req.session.user = users;
      res.send({ sessionData: req.session.user });
    });

    app.get('/get-session', (req, res) => {
      const userData = req.session.user;
      console.log(userData);
    });

    res.redirect(301, "/")
  } else {
    res.redirect(301, "/login?error=true")
  }
})

module.exports = router;