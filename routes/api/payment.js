const paymentController = require("../../controllers/paymentController");

const router = require("express").Router();

router.post("/secret", paymentController.pay);

module.exports = router;
