const path = require('path');

const express = require("express");


const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
 
  // res.send(
  //   "<div><form action='/add-product' method='POST'><input type='text' name='product' /><button type='submit'>Add</button></form></div>"
  // );

  res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
});

// /admin/product => POST
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
