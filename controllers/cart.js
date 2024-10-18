const Cart = require('../models/cart');
const Product = require("../models/product");


exports.getCart =(req,res,next) => {
  res.render('shop/cart', {pageTitle:'Your Shopping Cart', path:'/cart'});
}

exports.postCart = (req,res,post) => {
  const productID = req.body.productID;
  console.log(productID);
  Product.findById(productID, product => {
    Cart.addProduct(productID,product.price)
  })
  res.redirect('/cart');
}

exports.getOrders =(req,res,next) => {
  res.render('shop/orders', {pageTitle:'Your Orders', path:'/orders'});
}

exports.getCheckout =(req,res,next) => {
  res.render('shop/checkout', {pageTitle:'Checkout', path:'/checkout'});
}

