const express = require("express");

const router = express.Router();

const path = require("path");
const rootDir = require("../helpers/path");

const adminData = require("./admin");

router.get("/", (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  const products = adminData.products;
  res.render("shop", { prod: products, docTitle: "Shop" }); // rendering the template
});

module.exports = router;
