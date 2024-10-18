const express = require("express");

const router = express.Router();


const adminContoller = require('../controllers/admin');

// /admin/add-product => GET
router.get("/add-product", adminContoller.getAddProduct);

// /admin/product => POST
router.post("/add-product",adminContoller.postAddProduct );

// /admin/products => GET
router.get('/products', adminContoller.getAdminProducts)

// /admin/edit-products => GET
router.get('/edit-product/:productId', adminContoller.editProduct)

// /admin/edit-products => POST
router.post('/edit-product',adminContoller.postEditProduct);

// /admin/delete-products => POST
router.post('/delete-product', adminContoller.deleteProduct);


module.exports = router;