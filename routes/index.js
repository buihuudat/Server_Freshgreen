const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/auth", require("./api/auth"));
router.use("/user", require("./api/user"));
router.use("/category", require("./api/category"));
router.use("/tag", require("./api/tag"));
router.use("/voucher", require("./api/voucher"));
router.use("/news", require("./api/news"));
router.use("/product", require("./api/product"));
router.use("/shop", require("./api/shop"));

module.exports = router;
