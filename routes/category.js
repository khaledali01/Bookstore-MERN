const {
  create,
  read,
  remove,
  update,
  list,
  categoryById,
} = require("../controllers/category");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const express = require("express");

const router = express.Router();

router.get("/category/:categoryId", read);
router.post("/category/create/:userId", requireSignIn, isAuth, isAdmin, create);
router.delete(
  "/category/:categoryId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/category/:categoryId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  update
);
router.get('/categories', list)

router.param("categoryId", categoryById);
router.param("userId", userById);

module.exports = router;
