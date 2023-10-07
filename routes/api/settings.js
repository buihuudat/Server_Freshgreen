const settingController = require("../../controllers/settingController");

const router = require("express").Router();

router.get("/get/:adminID", settingController.get);
router.put("/:id/update/:adminID", settingController.update);
router.get("/banners", settingController.getBanner);

module.exports = router;
