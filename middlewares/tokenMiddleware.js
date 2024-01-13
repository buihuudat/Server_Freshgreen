const tokensNotification = require("../models/tokensNotification");

const tokenMiddleware = async (req, res, next) => {
  try {
    const tokens = await tokensNotification.find();
    if (!tokens.length) {
      await tokensNotification.create({
        tokens: [],
        devices: { mobile: [], web: [] },
      });
    } else {
      req.tokenId = tokens[0]._id;
    }
    next();
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = tokenMiddleware;
