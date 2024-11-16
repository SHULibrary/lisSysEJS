var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const recommendations = [
    {
      name: "The Psychology Of Money",
      author: "Morgan Housel",
      image: "/images/books/the-psychology-of-money.jpg",
    },
    {
      name: "How Innovation Works",
      author: "Matt Ridley",
      image: "/images/books/how-innovation-works.jpg",
    },
    {
      name: "Company Of One",
      author: "Paul Jarvis",
      image: "/images/books/company-of-one.jpg",
    },
    {
      name: "Iron Flame",
      author: "Rebecca Yarros",
      image: "/images/books/iron-flame.webp",
    },
  ];

  res.render("index", {
    recommendations,
  });
});

module.exports = router;
