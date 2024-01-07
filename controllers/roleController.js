const Role = require("../models/Role");

const roleController = {
  createRole: async (req, res) => {
    const { name, roles } = req.body;
    try {
      const role = await Role.create({ name, roles });
      return res.status(201).json(role);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error,
      });
    }
  },
  getAllRoles: async (req, res) => {
    try {
      const roles = await Role.find();
      return res.status(200).json(roles);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error,
      });
    }
  },
  getRoleById: async (req, res) => {
    const { id } = req.params;
    try {
      const role = await Role.findById(id);
      return res.status(200).json(role);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error,
      });
    }
  },
  updateRole: async (req, res) => {
    const { id } = req.params;
    const { name, roles } = req.body;
    try {
      const role = await Role.findByIdAndUpdate(
        id,
        { name, roles },
        {
          new: true,
        }
      );
      return res.status(200).json(role);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error,
      });
    }
  },
  deleteRole: async (req, res) => {
    const { id } = req.params;
    try {
      const role = await Role.findByIdAndDelete(id);
      return res.status(200).json(role);
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error,
      });
    }
  },
};

module.exports = roleController;
