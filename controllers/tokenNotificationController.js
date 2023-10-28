const TokensNotification = require("../models/tokensNotification");
const User = require("../models/User");

const tokenNotificationController = {
  pushToken: async (req, res) => {
    try {
      const { token, id, platform } = req.body;

      const tokensNotification = await TokensNotification.findOne();

      if (!tokensNotification) {
        await TokensNotification.create({
          tokens: [],
          devices: [],
        });
      }

      const tokens = tokensNotification?.tokens;
      const tokensDevice = tokensNotification?.devices;
      if (platform === "mobile") {
        if (!tokensDevice.mobile.includes(token))
          tokensDevice.mobile.push(token);
      } else {
        if (!tokensDevice.web.includes(token)) tokensDevice.web.push(token);
      }

      const userExisted = tokens.findIndex(
        (data) => data.user.userId.toString() === id
      );
      if (userExisted !== -1) {
        if (!tokens[userExisted].tokens.includes(token)) {
          tokens[userExisted].tokens.push(token);
        }
      } else {
        console.log(3);
        const user = await User.findById(id);
        tokens.push({
          tokens: [token],
          user: {
            userId: user._id,
            role: user.role,
          },
        });
      }

      await tokensNotification.save();

      return res.status(200).json(true);
    } catch (error) {
      console.error("Error adding token to notifications:", error);
      return res.status(500).json(error);
    }
  },
  slice: async (req, res) => {
    try {
      const token = req.body.token;
      const tokensNotification = await TokensNotification.findOne();
      const index = tokensNotification.tokens.indexOf(token);
      if (index !== -1) {
        tokensNotification.tokens.splice(index, 1);
        await tokensNotification.save();
        console.log("Token removed from notifications:", token);
      } else {
        console.log("Token not found in notifications:", token);
      }

      return res.status(200).json(true);
    } catch (error) {
      return res.status(200).json(error);
    }
  },
};

module.exports = tokenNotificationController;
