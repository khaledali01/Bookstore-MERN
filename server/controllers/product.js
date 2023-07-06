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

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? req.query.limit : 6;
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .then((products) => {
      res.json({
        message: "Product Listed successfully",
        productsList: products,
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "Products not listed",
      });
    });
};

exports.relatedProducts = (req, res) => {
  let limit = req.query.limit ? req.query.limit : 6;
  Product.find({
    _id: {
      $ne: req.product,
    },
    category: req.product.category,
  })
    .select("-photo")
    .limit(limit)
    .populate("category", "_id name")
    .then((products) => {
      res.json({
        message: "Related Product Listed successfully",
        productsList: products,
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "Products not found",
      });
    });
};

exports.listCategories = (req, res) => {
  Product.distinct("category")
    .then((categories) => {
      res.json({
        message: "Categories listed successfully",
        categoriesList: categories,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: "Categories not listed",
      });
    });
};

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? req.body.limit : 100;
  let skip = req.body.skip;
  let findArgs = {};

  console.log(order, sortBy, limit, skip, req.body.filters);
  console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .then((data) => {
      res.json({
        size: data.length,
        data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Products not found",
      });
    });
};

exports.productPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    // assigne category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query)
      .select("-photo")
      .then((products) => {
        res.json(products);
      })
      .catch((err) => {
        return res.status(400).json({
          error: errorHandler(err),
        });
      });
  }
};
