const express = require("express");

const router = express.Router();

router.use("/add-product", (req, res, next) => {
  console.log("In another middleware");
  res.send(
    "<div><form action='/product' method='POST'><input type='text' name='product' /><button type='submit'>Add</button></form></div>"
  );
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
