var express = require("express");
const { getList, ListMedia } = require("../server");
var router = express.Router();

const USER_ID = 3; /* TODO: fetch authorized user for the id */

/* GET sign in page. */
router.get("/", async function (req, res, next) {
  const books = await getList(USER_ID, "wishlist");
  res.render("wishlist", { books });
});

router.post("/", async function (req, res, next) {
  const { mediaId } = req.body;
  try {
    const success = await ListMedia("wishlist", USER_ID, mediaId);
    res.send({ success });
  } catch (error) {
    console.log(error);
    res.send({ success: false });
  }
});

module.exports = router;
