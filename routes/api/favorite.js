const favoriteController = require("../../controllers/favoriteController");
const userMiddleware = require("../../middlewares/userMiddleware");

const router = require("express").Router();

router.get("/:userId", userMiddleware, favoriteController.get);
router.post(
  "/:userId/update/:productId",
  userMiddleware,
  favoriteController.update
);

module.exports = router;
