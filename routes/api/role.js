const {
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  createRole,
} = require("../../controllers/roleController");

const router = require("express").Router();

router.get("/", getAllRoles);

router.get("/:id", getRoleById);

router.post("/", createRole);

router.put("/:id", updateRole);

router.delete("/:id", deleteRole);

module.exports = router;
