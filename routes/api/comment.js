const commentController = require("../../controllers/commentController");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const userMiddleware = require("../../middlewares/userMiddleware");

const router = require("express").Router();

router.get("/:productTitle", commentController.getProductComments);
router.post(
  "/product/:productId/user/:userId",
  userMiddleware,
  commentController.addComment
);
router.put(
  "/:commentId/reaction",
  userMiddleware,
  commentController.reactionComment
);
router.patch("/:commentId", adminMiddleware, commentController.delete);

module.exports = router;
