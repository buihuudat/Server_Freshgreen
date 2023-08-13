const orderController = require("../../controllers/orderController");

const router = require("express").Router();

router.get("/user/:userId", orderController.gets);
router.post("/user/:userId", orderController.create);
router.put("/:orderId/user/:userId", orderController.updateStatusOfOrder);
router.patch("/orders/user/:userId", orderController.delete);

module.exports = router;
