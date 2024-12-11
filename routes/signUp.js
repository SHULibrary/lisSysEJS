var express = require('express');
const { createUser } = require('../server');
var router = express.Router();
const salt = 10;

/* GET sign in page. */

router.get("/", function (req, res, next) {
  if (!req.session.user || req.session.user == null){
    res.render('login', { title: 'Express' })
  }
  else {
    res.render("signUp", { title: "Express" });
  }
  
});

router.post("/", async function(req, res, next) {
  const {name, email, username, password, DOB, number} = req.body;
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if(err) return res.json({Error: "Error for hashing password"});
    const values = [
      req.body.name,
      req.body.email,
      req.body.username,
      hash,
      req.body.DOB,
      req.body.number
    ]
    db.query(sql, [values], (err, reslut) => {
      if(err) return res.json({Error: "Inserting data Error in server"});
      return res.json({Status: "Success"});
    }
    )
  })
  if (createUser(name, email, username, password, DOB, number)) {
    res.redirect(301, "/");
  }
});

module.exports = router;
