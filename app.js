const express = require("express");
const app = express();

const path = require('path');
const rootDir = require('./helpers/path')


const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(express.urlencoded({ extended: true }));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir,  'views', 'page-not-found.html'));
});

app.listen(3000);
