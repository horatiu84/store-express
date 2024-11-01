const Product = require("../models/product");


exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  Product.findAll().
    then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Products",
        path: "/products"
      }); // rendering the template
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productID;
  Product.findByPk(prodId).then((product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: "Product details",
      path: "/product-detail"
    });
  }).catch(err => console.log(err))


}

exports.getIndex = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  // Product.fetchAll()
  //   .then(([rows,dataFields]) => {
  //     res.render("shop/index", {
  //       prods: rows,
  //       pageTitle: "Index",
  //       path: "/"
  //     }); // rendering the template
  //   })
  //   .catch(err => console.log(err))

  Product.findAll().
    then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Index",
        path: "/"
      }); // rendering the template
    })
    .catch(err => {
      console.log(err);
    })

};

