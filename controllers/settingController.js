const Settings = require("../models/Settings");
const User = require("../models/User");
const CryptoJS = require("crypto-js");

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
      const settings = await Settings.findOne();

      return res.status(200).json({
        ...settings,
        emailSendPort: CryptoJS.AES.decrypt(
          settings.emailSendPort.password,
          process.env.PASSWORD_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8),
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    const images = req.body.images;
    const { id, adminID } = req.params;
    const checkAdmin = await User.findById(adminID);
    // const banners = await Settings.create({
    //   banners: {
    //     images,
    //   },
    // });
    // return res.status(200).json(banners);
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

  mailport: async (req, res) => {
    try {
      const settings = await Settings.findOne();

      if (!settings) {
        return res.status(404).json({ error: "Settings not found" });
      }

      const emailSendPort = req.body;
      req.body.password = CryptoJS.AES.encrypt(
        emailSendPort.password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();
      if (emailSendPort) {
        settings.emailSendPort = emailSendPort;
        await settings.save();
        return res.status(200).json(settings.emailSendPort);
      } else {
        return res.status(400).json({ error: "Invalid request body" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = settingController;
