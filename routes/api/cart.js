const cartController = require("../../controllers/cartController");

const router = require("express").Router();

router.get("/:userId", cartController.getCart);
router.post("/:userId/add", cartController.addProductToCart);
router.put("/:cartId/add/:productId", cartController.upCountProduct);
router.put("/:cartId/remove/:productId", cartController.downCountProduct);
router.put("/:cartId/product/:productId", cartController.removeProduct);

module.exports = router;
