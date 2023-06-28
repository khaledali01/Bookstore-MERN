const { create } = require("../controllers/category");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const express = require("express");

const router = express.Router();

router.post("/category/create/:userId", requireSignIn, isAuth, isAdmin, create);

router.param("userId", userById);

module.exports = router;
