// const fs = require("fs");
// const path = require("path");
// const rootDir = require("../helpers/path");
const db = require('../utils/database');

const Cart = require('./cart');

// const p = path.join(rootDir, "data", "products");

// const getProductsFromFile = (cb) => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       return cb([]);
//     }
//     cb(JSON.parse(fileContent));
//   });
// };

module.exports = class Product {
  constructor(id,title, imageUrl, description, price) {
    this.id=id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
   return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)',
    [this.title, this.price, this.imageUrl, this.description])
  }

  //static findById(id, cb) { 
  //   getProductsFromFile(products => {
  //     const product = products.find(prod => prod.id === id);
  //     cb(product);
  // })
//};

static findById(id) { 
  return db.execute('SELECT * FROM products WHERE id = ?', [id])
  //   getProductsFromFile(products => {
  //     const product = products.find(prod => prod.id === id);
  //     cb(product);
  // })
};

 static deleteProduct(id) {
    // getProductsFromFile((products) => {
    //   const productIndex = products.findIndex(prod => prod.id === id);
    //   const updatedProducts = [...products];
    //   updatedProducts.splice(productIndex,1);
    //   const product = products.find(prod => prod.id === id);
    //   fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
    //     if(!err) {
    //       Cart.deleteProduct(id,product.price)
    //     }
    //   })
    // })
  }

  static  fetchAll() {
  //  getProductsFromFile(cb);
  return db.execute('SELECT * FROM products')
  }
};
