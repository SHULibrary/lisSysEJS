var express = require("express");
const { getList, ListMedia } = require("../server");
var router = express.Router();

router.get("/", async function (req, res, next) {
  if (!req.session.user || req.session.user == null) {
    res.render("login", { title: "Express" });
  } else {
    const books = await getList(req.session.user.id, "wishlist");
    res.render("wishlist", { books });
  }
});

router.post("/", async function (req, res, next) {
  const { mediaId } = req.body;
  try {
    const success = await ListMedia("wishlist", req.session.user.id, mediaId);
    res.send({ success });
  } catch (error) {
    console.log(error);
    res.send({ success: false });
  }
});

module.exports = router;
