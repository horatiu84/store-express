const products = [];

exports.getAddProduct =  (req, res, next) => {
  // res.send(
  //   "<div><form action='/add-product' method='POST'><input type='text' name='product' /><button type='submit'>Add</button></form></div>"
  // );

  // res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  res.render("add-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
  });
}

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
 
  res.render("shop", {
    prod: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
  }); // rendering the template
}