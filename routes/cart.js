const express = require('express');

const router = express.Router();

const cartController = require('../controllers/cart');

router.get('/cart', cartController.getCart);
router.post('/cart', cartController.postCart);

router.get('/orders',cartController.getOrders)

router.get('/checkout', cartController.getCheckout)

module.exports = router;