const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        totalPrice: Number,
        voucherUsed: String,
      },
    ],
    status: {
      type: String,
      enum: ["spending", "success", "cancel", "refuse", "default"],
      default: "default",
      index: true,
    },
    message: {
      type: String,
      default: "",
    },
    pay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
