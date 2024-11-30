var express = require('express');
const { createUser } = require('../server');
var router = express.Router();

/* GET sign in page. */

router.get('/', function(req, res, next) {
  res.render('signUp', { title: 'Express' });
});

router.post("/", async function(req, res, next) {
  const {name, email, username, password, DOB, number} = req.body;
  if (createUser(name, email, username, password, DOB, number)) {
    res.redirect(301, "/");
  }
})

module.exports = router;