const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id)
    .exec()
    .then((category) => {
      req.category = category;
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Category not found",
      });
    });
};

exports.create = (req, res) => {
  const category = new Category(req.body);
  category
    .save()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: errorHandler(err),
      });
    });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category
    .save()
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Category not updated",
        updatedCategory: updatedCategory,
      });
    });
};

exports.remove = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category
    .deleteOne()
    .then((deletedCategory) => {
      res.json({
        message: "Category deleted successfully",
        deletedCategory,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Category not deleted",
      });
    });
};

exports.list = (req, res) => {
  Category.find()
    .then((categoryList) => {
      res.json({
        categoryList,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "Categories not listed",
      });
    });
};
