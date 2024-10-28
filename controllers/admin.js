const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.editProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
   return res.redirect('/');
  }
  const paramId = req.params.productId;
  Product.findById(paramId, (product) => {
    console.log(product);
    if(!product) {
      return res.redirect('/')
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product
    });
  })
};

exports.postEditProduct = (req,res,next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const updatedProduct = new Product(id, title, imageUrl, description,price)
  updatedProduct.save();
  res.redirect('/');
}

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, price, description} = req.body;
  const product = new Product(null,title,imageUrl,description,price);
  product.save().then(()=>{
    res.redirect("/");
  }).catch((err) => {
    console.log(err);
  });
  
};

exports.deleteProduct = (req,res,next) => {
  const id = req.body.productId;
  Product.deleteProduct(id);
  res.redirect('/');
}

exports.getAdminProducts = (req,res,next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods:products,
      pageTitle: "Admin products page",
      path: "/admin/products"
    })
  })
}