const { signup } = require("../controllers/user");
const { userSignupValidator } = require("../validator/index");

const express = require("express");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);

module.exports = router;
