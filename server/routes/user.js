const { userById, read, update } = require("../controllers/user");
const { requireSignIn, isAuth } = require("../controllers/auth");

const express = require("express");

const router = express.Router();

router.get("/secret/:userId", requireSignIn, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", requireSignIn, isAuth, read);
router.put("/user/:userId", requireSignIn, isAuth, update);

router.param("userId", userById);

module.exports = router;
