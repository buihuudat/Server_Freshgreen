const mongoose = require("mongoose");

const tokenItem = new mongoose.Schema(
  {
    token: String,
    user: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const TokensNotification = new mongoose.Schema({
  tokens: [tokenItem],
});

module.exports = mongoose.model("TokensNotification", TokensNotification);
