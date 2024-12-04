var express = require("express");
const { getBooks, deleteMedia } = require("../server");
var router = express.Router();

const USER_ID = 3;

router.get("/", async function (req, res, next) {
  const { query } = req.query;
  const books = await getBooks(USER_ID, query);

  res.render("search", {
    books,
  });

  
});

router.post("/", async function (req, res, next) {
  const { mediaId } = req.body;
  if(deleteMedia(mediaId)) {
    res.redirect(301, "/");
  }

  // try {
  //   const success = await deleteMedia(mediaId);
  //   res.send({ success });
  // } catch {
  //   res.send({ success: false });
  // }
});

module.exports = router;
