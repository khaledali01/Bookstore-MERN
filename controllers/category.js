const Category = require("../models/category");
const { errorHandler } = require("../helpers/dbErrorHandler");

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
