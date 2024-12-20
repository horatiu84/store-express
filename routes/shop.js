const express = require("express");

const router = express.Router();



const shopController = require('../controllers/shop')

router.get("/", shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:productID',shopController.getProduct);


module.exports = router;
