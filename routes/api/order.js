const orderController = require("../../controllers/orderController");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const userMiddleware = require("../../middlewares/userMiddleware");

const router = require("express").Router();

router.get("/user/:userId", userMiddleware, orderController.gets);
router.get("/admin/:id", adminMiddleware, orderController.getOrders);
router.post("/user/:userId", userMiddleware, orderController.create);
router.put("/:orderId/user/:userId", orderController.updateStatusOfOrder);
router.delete("/orders/:orderId/user/:userId", orderController.delete);

module.exports = router;
