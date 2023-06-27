const { signup, signin, signout } = require("../controllers/user");
const { userSignupValidator } = require("../validator/index");

const express = require("express");

const router = express.Router();

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
