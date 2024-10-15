const express = require("express");

const router = express.Router();


const productsContoller = require('../controllers/products');

// /admin/add-product => GET
router.get("/add-product", productsContoller.getAddProduct);

// /admin/product => POST
router.post("/add-product",productsContoller.postAddProduct );

//module.exports = router;

module.exports = router;