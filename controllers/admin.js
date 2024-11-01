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
  if (!editMode) {
    return res.redirect('/');
  }
  const paramId = req.params.productId;
  Product.findByPk(paramId)
    .then(product => {
      if (!product) {
        return res.redirect('/')
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      });
    })
    .catch(err => {
      console.log(err)
    })
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  // const updatedProduct = new Product(id, title, imageUrl, description, price)
  // updatedProduct.save();
  Product.findByPk(id)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.description = description;
      product.price = price;
      return product.save();
    }).then(response => {
      res.redirect('/');
      console.log('Updated product!')
    })
    .catch(err => {
      console.log(err);
    })
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;

  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  })
    .then((resp) => {
      console.log("Product created!")
      res.redirect('/admin/products');
    }).catch(err => {
      console.log(err);
    })

};

exports.deleteProduct = (req, res, next) => {
  const id = req.body.productId;
  //Product.deleteProduct(id);
  Product.findByPk(id)
    .then(product => {
      return product.destroy();
    }).then(result => {
      console.log('Product destroyed')
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    })
}

exports.getAdminProducts = (req, res, next) => {
  // Product.fetchAll((products) => {
  //   res.render("admin/products", {
  //     prods: products,
  //     pageTitle: "Admin products page",
  //     path: "/admin/products"
  //   })
  // })

  req.user.getProducts()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin products page",
        path: "/admin/products"
      })
    })
    .catch((err) => {
      console.log(err);
    })
}