const Order = require("../models/Order");
const Cart = require("../models/Cart");

const orderController = {
  gets: async (req, res) => {
    const { userId } = req.params;
    try {
      const orders = await Order.findOne({ user: userId });
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
    const { status } = req.body;
    try {
      await Order.findOneAndUpdate(
        {
          user: userId,
          "orders._id": orderId,
        },
        { status }
      );
      return res.status(200).json({ message: "Updated order successfully" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  delete: async (req, res) => {
    const { userId } = req.params;
    try {
      await Order.findOneAndDelete({ user: userId });
      return res.status(200).json({ message: "Deleted order successfully" });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = orderController;
