const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");

const orderController = {
  gets: async (req, res) => {
    const { userId } = req.params;
    try {
      const orders = await Order.findOne({ user: userId }).populate(
        "user",
        "-password"
      );
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  create: async (req, res) => {
    const { userId } = req.params;
    const { order } = req.body;
    try {
      let newOrder;
      const checkOrder = await Order.findOne({ user: userId });
      if (!checkOrder) {
        newOrder = await Order.create({
          user: userId,
          orders: [order],
        });
      } else {
        newOrder = await Order.findOneAndUpdate(
          { user: userId },
          {
            $push: {
              orders: order,
            },
          },
          { new: true }
        );
      }
      await Cart.findOneAndDelete({ user: userId });

      const newOrderInfo = newOrder.orders[newOrder.orders.length - 1];

      return res.status(201).json(newOrderInfo);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateStatusOfOrder: async (req, res) => {
    const { userId, orderId } = req.params;
    const { status, message } = req.body;

    try {
      const updateData = { $set: { "orders.$.status": status } };

      if (message !== undefined) {
        updateData.$set["orders.$.message"] = message;
      }

      await Order.findOneAndUpdate(
        {
          user: userId,
          "orders._id": orderId,
        },
        updateData
      );

      const response = { orderId, status };

      if (message !== undefined) {
        response.message = message;
      }

      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  delete: async (req, res) => {
    const { userId } = req.params;
    try {
      await Order.findOneAndDelete({ "user._id": userId });
      return res.status(200).json({ message: "Deleted order successfully" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getOrders: async (req, res) => {
    const { id } = req.params;
    try {
      const admin = await User.findById(id);
      if (!admin || admin.role !== ("admin" || "superAdmin"))
        return res.status(401).json({ message: "You are not admin" });
      const orders = await Order.find().populate("user", "-password");
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = orderController;
