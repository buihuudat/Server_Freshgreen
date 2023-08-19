const commentController = require("../../controllers/commentController");

const router = require("express").Router();

router.get("/:productId", commentController.getProductComments);

module.exports = router;
