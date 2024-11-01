const Cart = require('../models/cart');
const Product = require("../models/product");
const Order = require('../models/order')


exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(cart => {
      return cart.getProducts().then(products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        })
      }).catch(err => console.log(err));
    }).catch(err => {
      console.log(err);
    })
}

exports.postCart = (req, res, post) => {
  const prodId = req.body.productID;
  let fetchedCart;
  let newQuantity = 1;
  console.log(req.body);
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      console.log(products)
      let product;
      if (products.length > 0) {
        product = products[0]
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId)
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      })
    }).then(() => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.postDeleteCartProduct = (req, res, next) => {
  const productId = req.body.productId;
  console.log(req.body)
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: productId } })
    }).then(products => {
      const product = products[0];
      return product.cartItem.destroy()
    }).then(result => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err))
}

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts()
    })
    .then(products => {
      return req.user.createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity }
            return product;
          }))
        })
        .catch(err => console.log(err))
    }).then(result => {
      return fetchedCart.setProducts(null);
    }).then(result => {
      res.redirect('/orders')
    })
    .catch(err => console.log(err))
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ['products'] })
    .then(orders => {
      res.render('shop/orders',
        {
          pageTitle: 'Your Orders',
          path: '/orders',
          orders: orders
        });
    })
    .catch(err => console.log(err))

}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', { pageTitle: 'Checkout', path: '/checkout' });
}

