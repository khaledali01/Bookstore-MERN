const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .exec()
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

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false }
  )
    .then((user) => {
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json({
        message: "User updated successfuly", 
        user: user
      });
    })
    .catch((err) => {
      return res.status(400).json({
        error: "You are not authorized to perform this action",
      });
    });
};
