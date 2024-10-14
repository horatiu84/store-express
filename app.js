const express = require("express");
const app = express();

const path = require("path");
const rootDir = require("./helpers/path"); // return te root directory

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "pug"); // tell express that we want to compile dinamic templates with pug engine
app.set("views", "views"); // where to find those templates - folder views

app.use(express.urlencoded({ extended: true }));
//to handle URL-encoded data from form submissions.
//When used, it automatically parses the incoming URL-encoded data and makes
//it available in a more accessible format for developers to use.
app.use(express.static(path.join(__dirname, "public"))); // serving a static firectory for static files

app.use("/admin", adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //res.status(404).sendFile(path.join(rootDir, "views", "page-not-found.html"));
  res.status(404).render("404", { pageTitle: "Page not found!" });
});

app.listen(3000);
