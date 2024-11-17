import { users } from "app.js";
var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  const recommendations = [
    /*{
      name: "The Psychology Of Money",
      author: "Morgan Housel",
      image: "/images/books/the-psychology-of-money.jpg",
    },*/
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
      image: "/images/books/iron-flame.png",
    },
    {
      name: "The Lost Bookshop",
      author: "Evie Woods",
      image: "/images/books/the-lost-bookshop.jpg",
    },
    {
      name: "Onyx Storm",
      author: "Rebecca Yarros",
      image: "/images/books/onyx-storm.jpg",
    },
    {
      name: "A Kingdom of Flesh and Fire",
      author: "Jennifer L. Armentrout",
      image: "/images/books/a-kingdom-of-flesh-and-fire.jpg",
    },
    {
      name: "Phantasma: A dark fantasy romance",
      author: "Kaylie Smith",
      image: "/images/books/phantasma-a-dark-fantasy-romance.jpg",
    },
  ];

  res.render("index", {
    recommendations,
  });
});

module.exports = router;
