var express = require("express");
const { getBooks, deleteMedia } = require("../server");
var router = express.Router();

router.get("/", async function (req, res, next) {
  if (!req.session.user || req.session.user == null){
    res.render('login', { title: 'Express' })
  }
  else {
    const { query } = req.query;
    const books = await getBooks(req.session.user.id, query);
    res.render("search", {
      books,
    });
  }
  
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
