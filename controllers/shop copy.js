const Product = require("../models/product");


exports.getProducts = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  Product.fetchAll()
  .then(([rows]) => {
    res.render("shop/product-list", {
      prods: rows,
      pageTitle: "Products",
      path: "/products",
      hasProducts: rows.length > 0,
    }); // rendering the template
  })
  .catch(err => console.log(err))
};

exports.getProduct = (req,res,next) => {
  const prodId = req.params.productID;
  Product.findById(prodId).then(([product]) => {
    res.render('shop/product-detail',{
      product: product[0],
      pageTitle: "Product details",
      path: "/product-detail"
    });
  }).catch(err => console.log(err))     
   
  
}

exports.getIndex = (req, res, next) => {
  // console.log(adminData.products);
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  Product.fetchAll()
    .then(([rows,dataFields]) => {
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Index",
        path: "/"
      }); // rendering the template
    })
    .catch(err => console.log(err))
  
};

