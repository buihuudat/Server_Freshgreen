const categoryController = require("../../controllers/categoryController");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const router = require("express").Router();

router.post("/", categoryController.create);
router.put("/:id", adminMiddleware, categoryController.update);
router.patch("/:id", adminMiddleware, categoryController.delete);
router.get("/", categoryController.gets);
router.get("/:name", categoryController.get);

module.exports = router;
