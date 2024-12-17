var express = require("express");
const { getList, ListMedia } = require("../server");
var router = express.Router();


/* GET sign in page. */
router.get("/", async function (req, res, next) {
  if (!req.session.user || req.session.user == null){
    res.render('login', { title: 'Express' })
  }
  else {
    const books = await getList(req.session.user.id, "checkedout");
    console.log(books);
    res.render("checkedout", { books });
  }
  
});

router.post("/", async function (req, res, next) {
    const { mediaId } = req.body;
    try {
      const success = await ListMedia("checkedout", req.session.user.id, mediaId);
      res.send({ success });
    } catch {
      console.log("didnt do it");
      res.send({ success: false });
    }
  });

module.exports = router;