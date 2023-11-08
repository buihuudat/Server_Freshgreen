const settingController = require("../../controllers/settingController");

const router = require("express").Router();

router.get("/get/:adminID", settingController.get);
router.put("/:id/update/:adminID", settingController.update);
router.get("/banners", settingController.getBanner);
router.post("/mailport", settingController.mailport);

module.exports = router;
