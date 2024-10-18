const fs = require('fs');
const path = require('path');

const rootDir = require("../helpers/path");

const p = path.join(rootDir, "data", "cart");

module.exports = class Cart {
  static addProduct(id, prodPrice) {
    
    // fetch the previous cart
      fs.readFile(p, (err, fileContent)=>{
        let cart = {products:[],totalPrice:0}
        if(!err){
          cart = JSON.parse(fileContent);
        }
        // analize the cart => the existing products
        const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
        const existingProduct = cart.products[existingProductIndex]
        
        let updatedProduct;

        if(existingProduct) {
          updatedProduct= {...existingProduct}
          updatedProduct.qty +=1;
          cart.products = [...cart.products];
          cart.products[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = {id:id, qty:1};
          cart.products = [...cart.products, updatedProduct]
        }

        cart.totalPrice = cart.totalPrice + +prodPrice; 
        fs.writeFile(p,JSON.stringify(cart),(err)=> {
          console.log(err);
        })
      })

    // add new product /increase
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err,fileContent) => {
      if(err) {
        return
      }
      const updatedCart = {...JSON.parse(fileContent)};
      const product = updatedCart.products.find(prod => prod.id === id);

      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice*product.qty
      fs.writeFile(p,JSON.stringify(updatedCart),(err)=> {
        console.log(err);
      })
    })
  }
} 