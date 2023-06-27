const User = require("../models/user");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      user.salt = undefined;
      user.hashed_password = undefined;
      res.json({
        user,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: errorHandler(error),
      });
    });
};
