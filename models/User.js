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
      // required: true,
      unique: true,
    },
    username: {
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
      enum: ["user", "staff", "producer", "admin", "superadmin"],
      default: "user",
    },
    googleId: String,
    verifyEmail: {
      type: Boolean,
      default: false,
    },
    verifyPhone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserScheema);
