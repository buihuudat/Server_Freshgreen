const Product = require("../models/Product");
const Shop = require("../models/Shop");
const User = require("../models/User");

const shopController = {
  create: async (req, res) => {
    try {
      const checkCreated = await Shop.findOne({ user: req.body.user });
      if (checkCreated) {
        return res
          .status(400)
          .json(`User has shop name is ${checkCreated.name}`);
      }
      const shop = await Shop.create(req.body);
      await User.findByIdAndUpdate(shop.user, { role: "producer" });
      return res.status(201).json(shop);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const checkExisted = await Shop.findOne({ name: req.body.name });
      if (checkExisted.user === req.body.user) {
        return res
          .status(400)
          .json(`User has shop name is ${checkExisted.name}`);
      }
      const newShop = await Shop.findByIdAndUpdate(req.params.id, req.body);
      if (!newShop) {
        return res.status.json("Shop not found");
      }
      return res.status(200).json(newShop);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const shop = await Shop.findByIdAndDelete(req.params.id);
      if (!shop) {
        return res.status(400).json("Shop not found");
      }
      await User.findByIdAndUpdate(req.body.user, {
        role: "user",
        products: [],
      });
      await Product.deleteMany({ shop: shop._id });
      return res.status(200).json("Shop delete successful");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const shop = await Shop.findById(req.params.id).populate({
        path: "user",
        model: "User",
        select: "address phone email avatar",
      });
      if (!shop) {
        return res.status(400).json("Shop not found");
      }
      return res.status(200).json(shop);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  gets: async (req, res) => {
    try {
      const shops = await Shop.find().populate({
        path: "user",
        model: "User",
        select: "address phone email avatar",
      });
      return res.status(200).json(shops);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = shopController;
