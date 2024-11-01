const express = require("express");
const app = express();

const path = require("path");
const rootDir = require("./helpers/path"); // return te root directory
//const extressHbs = require("express-handlebars");

// DATABASE CONNECTION EXAMPLE :

// const db = require('./utils/database');
// db.execute('SELECT * FROM products')
//   .then(
//     (result) => {
//       console.log(result);
//     })

//   .catch(
//     (err)=> {
//       console.log(err);
//     })

const sequelize = require('./utils/database')
const Product = require('./models/product');
const User = require('./models/users');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item')
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const cartRoutes = require('./routes/cart');

const missingPageController = require('./controllers/404')

// using engines for html

// 1.handlebars

/*app.engine(
  "handlebars",
  extressHbs({ layoutsDir: "views/layouts/", defaultLayout: "main-layout" })
); // we need to use engine app for not build in engines like pug
app.set("view engine", "handlebars"); // tell express that we want to compile dinamic templates with handlebars engine
*/

//2.pug
//app.set("view engine", "pug"); // tell express that we want to compile dinamic templates with pug engine

//3.ejs
app.set("view engine", "ejs");
app.set("views", "views"); // where to find those templates - folder views

app.use(express.urlencoded({ extended: true }));
//to handle URL-encoded data from form submissions.
//When used, it automatically parses the incoming URL-encoded data and makes
//it available in a more accessible format for developers to use.
app.use(express.static(path.join(rootDir, "public"))); // serving a static directory for static files

app.use((req, res, next) => {
  User.findByPk(1).then(user => {
    req.user = user;
    next();
  }).catch(err => {
    console.log(err);
  });
})

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(cartRoutes);


app.use(missingPageController.getMissingPage);


Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem })
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem })

sequelize.sync()
  .then(
    (resp) => {
      return User.findByPk(1);
    })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Horas', email: 'test@test.com' });
    };
    return Promise.resolve(user);
  })
  .then(user => {
    return user.getCart().then(cart => {
      if (!cart) {
        return user.createCart();
      }
      return Promise.resolve(cart)
    })
  })
  .then(cart => {
    app.listen(3000);
  }).catch(err => console.log(err));

