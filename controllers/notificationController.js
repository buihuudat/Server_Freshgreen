const Notification = require("../models/Notification");

const notificationController = {
  gets: async (req, res) => {
    try {
      const notifications = await Notification.find();
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = notificationController;
