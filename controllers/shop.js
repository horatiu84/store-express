const Product = require("../models/product");


exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "Products",
      path: "/products",
      hasProducts: products.length > 0,
    }); // rendering the template
  });
};

exports.getProduct = (req,res,next) => {
  const prodId = req.params.productID;
  Product.findById(prodId, prod => {
    
    res.render('shop/product-detail',{
      prods: prod,
      pageTitle: "Product details",
      path: "/product-detail"
    });
  } );
}

exports.getIndex = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Index",
      path: "/",
      hasProducts: products.length > 0,
    }); // rendering the template
  });
};

