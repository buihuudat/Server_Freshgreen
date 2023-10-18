const messageController = require("../../controllers/messageController");

const router = require("express").Router();

router.post("/:userId/ask-ai", messageController.ask);

module.exports = router;
