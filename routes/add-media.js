var express = require("express");
const { addMedia } = require("../server");
var router = express.Router();


router.get('/', async function(req, res, next) {
    res.render('add-media');
});

router.post("/", async function (req, res, next) {
  const { name, description, author, numAvail, numOf } = req.body;
  try {
    const success = await addMedia(name, description, author, numAvail, numOf);
    res.send({ success });
  } catch {
    res.send({ success: false });
    console.log("FAIL");
  }
});


module.exports = router;