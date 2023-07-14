const mongoose = require("mongoose");

const UserScheema = new mongoose.Schema(
  {
    fullname: {
      firstname: String,
      lastname: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    avatar: {
      type: String,
      default: "",
    },
    address: {
      city: String,
      district: String,
      ward: String,
      street: String,
      more: String,
    },
    role: {
      type: "string",
      enum: ["user", "customer", "admin"],
      default: "user",
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserScheema);
