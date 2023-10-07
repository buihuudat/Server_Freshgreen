const Settings = require("../models/Settings");
const User = require("../models/User");

const settingController = {
  get: async (req, res) => {
    try {
      const checkAdmin = await User.findById(req.params.adminID);
      if (
        !checkAdmin ||
        (checkAdmin.role !== "admin" && checkAdmin.role !== "superadmin")
      ) {
        return res.status(400).json({ message: "wft???" });
      }
      const settings = await Settings.find();
      return res.status(200).json(settings[0]);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    const images = req.body.images;
    const { id, adminID } = req.params;
    const checkAdmin = await User.findById(adminID);
    console.log(adminID, checkAdmin);
    if (
      !checkAdmin ||
      (checkAdmin.role !== "admin" && checkAdmin.role !== "superadmin")
    ) {
      return res.status(400).json({ message: "wft???" });
    }
    try {
      const banners = await Settings.findByIdAndUpdate(id, {
        banners: {
          images,
        },
      });

      return res.status(200).json(banners);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getBanner: async (req, res) => {
    try {
      const banners = await Settings.find();
      return res.status(200).json(banners[0].banners);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = settingController;
