const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    roles: {
      type: [String],
      required: true,
      default: ["view"],
      enum: ["create", "update", "delete", "view"],
    },
  },
  { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
