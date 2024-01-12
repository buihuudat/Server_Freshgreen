const tagController = require("../../controllers/tagController");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const router = require("express").Router();

router.get("/", tagController.gets);
router.get("/:name", adminMiddleware, tagController.get);
router.post("/", adminMiddleware, tagController.create);
router.patch("/:id", adminMiddleware, tagController.delete);

module.exports = router;
