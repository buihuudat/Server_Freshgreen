const UnitController = require("../../controllers/unitController");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const router = require("express").Router();

router.get("/", UnitController.gets);
router.get("/:name", UnitController.get);
router.post("/", adminMiddleware, UnitController.create);
router.patch("/:id", adminMiddleware, UnitController.delete);

module.exports = router;
