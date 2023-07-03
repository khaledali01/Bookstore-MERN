const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
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

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((response) => {
      console.log(response);

      if (!response.authenticate(password)) {
        return res.status(400).json({
          error: "Invalid Password",
        });
      }

      const token = jwt.sign(
        {
          _id: response._id,
        },
        process.env.JWT_SECRET
      );
      res.cookie("t", token, { expire: new Date() + 9999 });
      const { _id, name, email, role } = response;
      return res.json({
        token,
        user: { _id, email, name, role },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "Invalid Email, rewrite it or Signup",
      });
    });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({
    message: "Signout Successful",
  });
};

exports.requireSignIn = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "This is for Admins Only! Access Denied",
    });
  }
  next();
};
