const Notification = require("../models/Notification");

const notificationController = {
  gets: async (req, res) => {
    try {
      const notifications = await Notification.find().populate({
        path: "auth",
        model: "User",
        select: "_id fullname avatar",
      });
      return res.status(200).json(notifications);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  create: async (req, res) => {
    try {
      const newNotification = await Notification.create(req.body);
      const notification = await Notification.findById(
        newNotification._id
      ).populate({
        path: "auth",
        model: "User",
        select: "_id fullname avatar",
      });
      return res.status(201).json(notification);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    try {
      const notification = await Notification.findByIdAndUpdate(id, {
        status: req.body.status,
      });
      if (!notification) return res.status(404).json("Notification not found");
      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json(false);
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const notification = await Notification.findByIdAndDelete(id);
      if (!notification) return res.status(404).json("Notification not found");
      return res.status(200).json(true);
    } catch (error) {
      return res.status(500).json(false);
    }
  },
};

module.exports = notificationController;
