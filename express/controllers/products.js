const Product = require('../models/product')

const path = require('path');
const rootDir = require("../util/path");

exports.getAddProducts = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
};

exports.postAddProducts = (req, res, next) => {
  console.log(req.body);
  const product = new Product(req.body.title);
  product.save()
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  // const product = 
  Product.fetchAll(product =>{res.sendFile(path.join(rootDir, "views", "shop.html"));})
  
};

// getContact, postContact, getSuccess

exports.getContact = (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'contact.html'));
};

exports.postContact = (req, res, next) => {
  console.log(req.body);
  res.redirect('/success');
};

exports.getSuccess = (req, res) => {
  res.sendFile(path.join(rootDir, 'views', 'success.html'));
};
