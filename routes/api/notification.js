const router = require("express").Router();
const notificationController = require("../../controllers/notificationController");

router.get("/", notificationController.gets);

module.exports = router;
