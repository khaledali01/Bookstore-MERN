const { signup, signin } = require("../controllers/user");
const { userSignupValidator } = require("../validator/index");

const express = require("express");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);

module.exports = router;
