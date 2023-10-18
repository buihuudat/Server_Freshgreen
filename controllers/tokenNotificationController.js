const TokensNotification = require("../models/tokensNotification");

const tokenNotificationController = {
  pushToken: async (req, res) => {
    try {
      const { token, id } = req.body;
      const tokensNotification = await TokensNotification.findOne();

      const existingTokenIndex = tokensNotification.tokens.findIndex(
        (item) => item.token === token
      );
      const isTokenExist = existingTokenIndex !== -1;
      const isDifferentUser =
        isTokenExist &&
        tokensNotification.tokens[existingTokenIndex].user !== id;

      if (isTokenExist && isDifferentUser) {
        tokensNotification.tokens[existingTokenIndex].user = id;
        await tokensNotification.save();
        return res.status(200).json(true);
      }

      if (!isTokenExist) {
        tokensNotification.tokens.push({ token, user: id });
        await tokensNotification.save();
        return res.status(200).json(true);
      }

      return res.status(200).json(false);
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
