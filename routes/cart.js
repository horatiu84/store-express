const express = require('express');

const router = express.Router();

const cartController = require('../controllers/cart');

router.get('/cart', cartController.getCart);
router.post('/cart', cartController.postCart);

router.get('/orders', cartController.getOrders);
router.post('/create-order', cartController.postOrder)

router.get('/checkout', cartController.getCheckout);

router.post('/cart-delete-item', cartController.postDeleteCartProduct);

module.exports = router;