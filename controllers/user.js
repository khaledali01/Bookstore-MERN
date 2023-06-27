const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec()
    .then((response) => {
      console.log(response);
      req.profile = response;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "User not found",
      });
    });
};
