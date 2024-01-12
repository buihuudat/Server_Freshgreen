const settingController = require("../../controllers/settingController");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const router = require("express").Router();

router.get("/get/:adminID", adminMiddleware, settingController.get);
router.put("/:id/update/:adminID", adminMiddleware, settingController.update);
router.get("/banners", settingController.getBanner);
router.post("/mailport", adminMiddleware, settingController.mailport);
router.post("/token-gpt", adminMiddleware, settingController.tokenGPT);

module.exports = router;
