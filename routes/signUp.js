var express = require('express');
const { createUser, authUser } = require('../server');
var router = express.Router();
const salt = 10;

/* GET sign in page. */

router.get("/", function (req, res, next) {
  res.render("signUp", { title: "Express" });
  
});

router.post("/", async function(req, res, next) {
  const {name, email, username, password, DOB, number} = req.body;
  if (createUser(name, email, username, password, DOB, number)) {
    const users = await authUser(username, password);
    const user = { ...users[0] };
    req.session.user = user;
    res.redirect(301, "/");
  }
});

module.exports = router;
