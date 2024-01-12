const deliveryController = require("../../controllers/deliveryController");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const router = require("express").Router();

router.get("/", deliveryController.gets);
router.post("/", adminMiddleware, deliveryController.create);
router.delete("/:id", adminMiddleware, deliveryController.delete);

module.exports = router;
