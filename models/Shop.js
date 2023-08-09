const mongoose = require("mongoose");
const ShopSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bio: String,
    startYear: {
      type: Number,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    ratings: [
      {
        stars: {
          type: Number,
          required: true,
        },
        count: {
          type: Number,
          default: 0,
        },
      },
    ],
    averageStarRating: {
      type: Number,
      default: function () {
        if (this.star.count === 0) return 0;
        return (
          this.ratings.reduce(
            (acc, rating) => acc + rating.stars * rating.count,
            0
          ) / this.star.count
        ).toFixed(2);
      },
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Shop", ShopSchema);
