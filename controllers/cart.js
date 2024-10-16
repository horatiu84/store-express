exports.getCart =(req,res,next) => {
  res.render('shop/cart', {pageTitle:'Your Shopping Cart', path:'/cart'});
}

exports.getOrders =(req,res,next) => {
  res.render('shop/orders', {pageTitle:'Your Orders', path:'/orders'});
}

exports.getCheckout =(req,res,next) => {
  res.render('shop/checkout', {pageTitle:'Checkout', path:'/checkout'});
}

