const shopController = require("../../controllers/shopController");
const { body } = require("express-validator");
const validation = require("../../handlers/validationHandler");
const Shop = require("../../models/Shop");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const router = require("express").Router();

router.get("/", shopController.gets);
router.get("/:id", shopController.get);
router.post(
  "/create",
  adminMiddleware,
  body("name").custom(async (name) => {
    const shop = await Shop.findOne({ name });
    if (shop) {
      throw new Error("Shop name is already used");
    }
  }),
  validation,
  shopController.create
);
router.put("/:id/follow", adminMiddleware, shopController.follow);
router.put("/:id", adminMiddleware, shopController.update);
router.patch("/:id", adminMiddleware, shopController.delete);

module.exports = router;
