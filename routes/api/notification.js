const router = require("express").Router();
const notificationController = require("../../controllers/notificationController");
const tokenNotificationController = require("../../controllers/tokenNotificationController");

router.get("/", notificationController.gets);
router.post("/create", notificationController.create);
router.put("/:id", notificationController.update);
router.patch("/:id", notificationController.delete);

router.post("/push-notification", notificationController.pushNotification);
router.put("/token/push", tokenNotificationController.pushToken);
router.put("/token/slice", tokenNotificationController.slice);

module.exports = router;
