const User = require("../models/user");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save();
  res.json({
    user,
  });
};
