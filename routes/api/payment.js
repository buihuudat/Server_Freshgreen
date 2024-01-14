const paymentController = require("../../controllers/paymentController");
const userMiddleware = require("../../middlewares/userMiddleware");

const router = require("express").Router();

router.post("/secret", userMiddleware, paymentController.visaMethod);
router.post("/vnpay", userMiddleware, paymentController.createVnPayQRCode);
router.post("/momo", userMiddleware, paymentController.momoMethod);
// router.get("/vnpay_ipn", paymentController.paymentIpn);
// router.get("/vnpay_return", paymentController.vnpayReturn);

module.exports = router;
