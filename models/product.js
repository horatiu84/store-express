const fs = require("fs");
const path = require("path");
const rootDir = require("../helpers/path");

const p = path.join(rootDir, "data", "products");

const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static async fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
