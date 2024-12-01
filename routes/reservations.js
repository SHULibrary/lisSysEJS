var express = require("express");
const { getList, ListMedia } = require("../server");
var router = express.Router();

const USER_ID = 3; /* TODO: fetch authorized user for the id */

/* GET sign in page. */
router.get("/", async function (req, res, next) {
  const books = await getList(USER_ID, "reservations");
  res.render("reservations", { books });
});

router.post("/", async function (req, res, next) {
  const { mediaId } = req.body;

  try {
    const success = await ListMedia("reservations", USER_ID, mediaId);
    res.send({ success });
  } catch {
    res.send({ success: false });
  }
});

module.exports = router;