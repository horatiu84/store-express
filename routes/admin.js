const path = require("path");

const express = require("express");

const router = express.Router();
const products = [];

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  // res.send(
  //   "<div><form action='/add-product' method='POST'><input type='text' name='product' /><button type='submit'>Add</button></form></div>"
  // );

  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
});

// /admin/product => POST
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

//module.exports = router;

exports.routes = router;
exports.products = products;
