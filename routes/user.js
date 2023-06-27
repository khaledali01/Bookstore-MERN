const { userById } = require("../controllers/user");
const { requireSignIn } = require("../controllers/auth");

const express = require("express");

const router = express.Router();

router.get("/secret/:userId", requireSignIn, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.param("userId", userById);

module.exports = router;
