const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: [String],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: Number,
    lastPrice: {
      type: Number,
      default: function () {
        return this.price;
      },
    },
    discount: {
      type: Number,
      default: 0,
    },
    star: {
      count: {
        type: Number,
      },
      ratings: [
        {
          stars: Number,
          count: Number,
        },
      ],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    status: {
      type: Boolean,
      default: true,
    },
    quantity: Number, // số lượng
    currentQuantity: {
      type: Number,
      default: function () {
        return this.quantity;
      },
    },
    sold: {
      type: Number,
      default: function () {
        return this.quantity - this.currentQuantity;
      },
    },
    brand: String,
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
