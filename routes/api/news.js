const { body } = require("express-validator");
const newsController = require("../../controllers/newsController");
const validation = require("../../handlers/validationHandler");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const router = require("express").Router();

router.get("/", newsController.gets);
router.get("/:title", newsController.get);
router.post(
  "/create",
  adminMiddleware,
  body("title").isLength({ min: 10, max: 100 }).withMessage("Invalid title"),
  body("content").isLength({ min: 50 }).withMessage("Invalid content"),
  validation,
  newsController.create
);
router.put("/:id/views", adminMiddleware, newsController.updateView);
router.put("/:id/like/:userId", adminMiddleware, newsController.updateLike);
router.put(
  "/:id",
  adminMiddleware,
  body("title").isLength({ min: 10, max: 100 }).withMessage("Invalid title"),
  body("content").isLength({ min: 50 }).withMessage("Invalid content"),
  validation,
  newsController.update
);
router.patch("/:id", adminMiddleware, newsController.delete);

module.exports = router;
