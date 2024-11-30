var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('items', { title: 'Express' });
  });

module.exports = router;