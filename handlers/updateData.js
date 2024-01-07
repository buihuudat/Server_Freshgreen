const Role = require("../models/Role");
const User = require("../models/User");
const { ObjectId } = require("mongoose").Types;

const dataUpdate = {
  updatePermissionsForAllUsers: async () => {
    try {
      const permissions = await Role.find();
      const users = await User.find();

      users.forEach((user) => {
        permissions.forEach(async (permission) => {
          if (user.role === permission.name) {
            user.permissions = new ObjectId(permission._id);
            await user.save();
          }
        });
      });
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  },
};

module.exports = dataUpdate;
