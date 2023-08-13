const mongoose = require("mongoose");

const OrderItem = new mongoose.Schema(
  {
    products: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        images: [String],
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        price: Number,
        discount: {
          type: Number,
          default: 0,
        },
        lastPrice: Number,

        averageStarRating: Number,

        category: {
          type: String,
        },
        tags: [
          {
            name: String,
          },
        ],
        status: {
          type: Boolean,
          default: true,
        },

        quantity: Number,

        brand: String,
        shop: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Shop",
        },

        count: { type: Number, default: 0 },
      },
    ],
    totalPrice: Number,
    voucherUsed: {
      voucher: String,
      discount: Number,
    },
    status: {
      type: String,
      enum: ["spending", "success", "cancel", "refuse"],
      default: "spending",
      index: true,
    },
    message: {
      type: String,
      default: "",
    },
    pay: {
      method: {
        type: String,
        enum: ["payNow", "lastPay"],
        required: true,
      },
      amount: {
        type: Number,
        default: function () {
          return this.totalPrice;
        },
      },
      status: {
        type: String,
        enum: ["spending", "falure", "success"],
        default: "pending",
      },
    },
  },
  { timestamps: true }
);

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orders: [OrderItem],
});

module.exports = mongoose.model("Order", OrderSchema);
