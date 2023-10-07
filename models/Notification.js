const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    auth: String,
    title: String,
    description: String,
    path: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
