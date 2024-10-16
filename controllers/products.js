const Product = require("../models/product");
exports.getAddProduct = (req, res, next) => {
  // res.send(
  //   "<div><form action='/add-product' method='POST'><input type='text' name='product' /><button type='submit'>Add</button></form></div>"
  // );

  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  res.render("admin/add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prod: products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
    }); // rendering the template
  });
};
