var express = require("express");
const { addMedia } = require("../server");
var router = express.Router();


router.get('/', async function(req, res, next) {
    console.log("HELLO");
    res.render('add-media');
});

router.post("/", async function (req, res, next) {
  console.log("HELLO2");
  const { name, description, author, numAvail, numOf } = req.body;
  try {
    const success = await addMedia(name, description, author, numAvail, numOf);
    console.log("HELLOadfklj;")
    res.send({ success });
  } catch {
    res.send({ success: false });
    console.log("FAIL");
  }
});


module.exports = router;