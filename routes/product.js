const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  relatedProducts,
  listCategories, 
  listBySearch
} = require("../controllers/product");
const { requireSignIn, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

const express = require("express");

const router = express.Router();

router.get("/product/:productId", read);
router.get("/products", list);
router.get("/products/related/:productId", relatedProducts);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.post("/product/create/:userId", requireSignIn, isAuth, isAdmin, create);
router.delete(
  "/product/:productId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  update
);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
