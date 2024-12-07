var express = require("express");
const { getList, ListMedia } = require("../server");
var router = express.Router();

const USER_ID = 3; /* TODO: fetch authorized user for the id */

/* GET sign in page. */
router.get("/", async function (req, res, next) {
  res.render("account");
});

module.exports = router;
