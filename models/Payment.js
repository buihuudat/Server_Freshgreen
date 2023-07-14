const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["spending", "falure", "success"],
    },
    method: String,
    amount: Number,
    transactionId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
