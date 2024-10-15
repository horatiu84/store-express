const express = require("express");
const app = express();

const path = require("path");
const rootDir = require("./helpers/path"); // return te root directory
//const extressHbs = require("express-handlebars");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");


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

app.use("/admin", adminRoutes);
app.use(shopRoutes);


app.use(missingPageController.getMissingPage);

app.listen(3000);
