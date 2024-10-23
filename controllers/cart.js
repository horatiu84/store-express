const Cart = require('../models/cart');
const Product = require("../models/product");


exports.getCart =(req,res,next) => {
  Cart.getCart( cart => {
    
    Product.fetchAll(products => {
      
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if (cartProductData) {
          cartProducts.push({productData:product, qty:cartProductData.qty})
        }
      
      }
      res.render('shop/cart', 
      {pageTitle:'Your Shopping Cart', path:'/cart', products: cartProducts});
    })
  });
}

exports.postCart = (req,res,post) => {
  const productID = req.body.productID;
  console.log(productID);
  Product.findById(productID, product => {
    Cart.addProduct(productID,product.price)
  })
  res.redirect('/cart');
}

exports.postDeleteCartProduct = (req,res,next) => {
  const productId = req.body.productId;
  Product.findById(productId, product => {
    Cart.deleteProduct(productId,product.price);
    res.redirect('/cart');
  })
}


exports.getOrders =(req,res,next) => {
  res.render('shop/orders', {pageTitle:'Your Orders', path:'/orders'});
}

exports.getCheckout =(req,res,next) => {
  res.render('shop/checkout', {pageTitle:'Checkout', path:'/checkout'});
}

