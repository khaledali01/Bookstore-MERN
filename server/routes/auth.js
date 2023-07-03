const {
  signup,
  signin,
  signout,
  requireSignIn,
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator/index");

const express = require("express");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
