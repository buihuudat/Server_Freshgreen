const {
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  createRole,
} = require("../../controllers/roleController");
const adminMiddleware = require("../../middlewares/adminMiddleware");

const router = require("express").Router();

router.get("/", getAllRoles);

router.get("/:id", getRoleById);

router.post("/", adminMiddleware, createRole);

router.put("/:id", adminMiddleware, updateRole);

router.delete("/:id", adminMiddleware, deleteRole);

module.exports = router;
