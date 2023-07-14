const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    description: String,
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bio: String,
    startYear: Number,
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
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
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Follower",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", ShopSchema);
