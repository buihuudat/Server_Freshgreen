const cartController = require("../../controllers/cartController");
const userMiddleware = require("../../middlewares/userMiddleware");

const router = require("express").Router();

router.get("/:userId", userMiddleware, cartController.getCart);
router.post("/:userId/add", userMiddleware, cartController.addProductToCart);
router.put(
  "/:userId/add/:productId",
  userMiddleware,
  cartController.upCountProduct
);
router.put(
  "/:userId/remove/:productId",
  userMiddleware,
  cartController.downCountProduct
);
router.put(
  "/:userId/product/:productId",
  userMiddleware,
  cartController.removeProduct
);

module.exports = router;
