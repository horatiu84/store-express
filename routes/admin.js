const express = require("express");

const router = express.Router();


const adminContoller = require('../controllers/admin');

// /admin/add-product => GET
router.get("/add-product", adminContoller.getAddProduct);

// /admin/product => POST
router.post("/add-product",adminContoller.postAddProduct );

// /admin/products => GET
router.get('/products', adminContoller.getAdminProducts)


module.exports = router;