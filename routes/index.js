const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/auths", require("./api/auth"));
router.use("/users", require("./api/user"));
router.use("/categorys", require("./api/category"));
router.use("/tags", require("./api/tag"));
router.use("/voucherss", require("./api/voucher"));
router.use("/news", require("./api/news"));
router.use("/products", require("./api/product"));
router.use("/shops", require("./api/shop"));

module.exports = router;
