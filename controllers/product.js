const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .exec()
    .then((response) => {
      req.product = response;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "Product not found",
      });
    });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.remove = (req, res) => {
  let product = req.product;
  product
    .deleteOne()
    .then((response) => {
      res.json({
        message: "Product deleted successfully",
        deletedProducts: response,
      });
    })
    .catch((err) => {
      res.status(400).json({
        err,
        error: "Product Not Found",
      });
    });
};

exports.create = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    const { name, description, price, category, quantity, photo, shipping } =
      fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !shipping ||
      !quantity
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image size should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product
      .save()
      .then((result) => {
        res.json({
          message: "Product created successfully",
          product: result,
        });
      })

      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: errorHandler(err),
        });
      });
  });
};

exports.update = (req, res) => {
  let form = formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    const { name, description, price, category, quantity, photo, shipping } =
      fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !shipping ||
      !quantity
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    let product = req.product;
    product = _.extend(product, fields);
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image size should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }
    product
      .save()
      .then((result) => {
        res.json({
          message: "Product updated successfully",
          product: result,
        });
      })

      .catch((err) => {
        console.log(err);
        res.status(400).json({
          error: errorHandler(err),
        });
      });
  });
};
