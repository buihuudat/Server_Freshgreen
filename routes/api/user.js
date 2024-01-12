const userController = require("../../controllers/userController");
const { body } = require("express-validator");
const validation = require("../../handlers/validationHandler");
const adminMiddleware = require("../../middlewares/adminMiddleware");
const userMiddleware = require("../../middlewares/userMiddleware");

const router = require("express").Router();

router.get("/gets", adminMiddleware, userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/:id/change-avatar", userController.changeAvatar);
router.put(
  "/:id",
  body("fullname.firstname")
    .isLength({ min: 2, max: 8 })
    .withMessage("Họ không hợp lệ"),
  body("fullname.lastname")
    .isLength({ min: 2, max: 8 })
    .withMessage("Tên không hợp lệ"),
  body("username")
    .isLength({ min: 6, max: 50 })
    .withMessage("Tên người dùng không hợp lệ"),
  body("phone")
    .isLength({ min: 10, max: 11 })
    .withMessage("Số điện thoại không hợp lệ"),
  validation,
  userController.updateUser
);

router.put("/:userId/role", adminMiddleware, userController.updateRole),
  router.patch("/:id", userController.delete);

router.post("/send-code-email", userMiddleware, userController.sendCodeEmail);
router.post("/verify-email", userMiddleware, userController.verifyEmail);
router.post("/verify-phone", userMiddleware, userController.verifyPhone);

module.exports = router;
