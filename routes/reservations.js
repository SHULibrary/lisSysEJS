var express = require("express");
const { getList, ListMedia } = require("../server");
var router = express.Router();


/* GET sign in page. */
router.get("/", async function (req, res, next) {
  if (!req.session.user || req.session.user == null){
    res.render('login', { title: 'Express' })
  }
  else {
    const books = await getList(req.session.user.id, "reservations");
    res.render("reservations", { books });
  }
  
});

router.post("/", async function (req, res, next) {
  const { mediaId } = req.body;

  try {
    const success = await ListMedia("reservations", req.session.user.id, mediaId);
    res.send({ success });
  } catch {
    res.send({ success: false });
  }
});

module.exports = router;