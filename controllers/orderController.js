const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");
const { notificationHandler } = require("../handlers/notificationHandler");
const tokensNotification = require("../models/tokensNotification");
const admin = require("firebase-admin");

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

      const newOrderInfo = newOrder.orders[newOrder.orders.length - 1];
      await Promise.all([
        await Cart.findOneAndDelete({ user: userId }),
        ...newOrderInfo.products.map(async (product) => {
          await Product.findByIdAndUpdate(product._id, {
            $inc: { currentQuantity: -1, sold: +1 },
          });
        }),
      ]);

      const { tokens } = await tokensNotification.findOne();

      const tokensResult = tokens
        .filter((data) => data.user.role === "admin")
        .flatMap((data) => data.tokens);

      await admin.messaging().sendEachForMulticast({
        notification: {
          title: "FreshGreen",
          body: "Có một đơn hàng mới",
        },
        tokens: tokensResult,
        data: {
          userId,
        },
      });

      return res.status(201).json(newOrderInfo);
    } catch (error) {
      console.log(error);
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

      const { tokens } = await tokensNotification.findOne();

      const userFiltered = tokens.find(
        (token) => token.user.userId.toString() === userId
      );

      if (status === "access") {
        await admin.messaging().sendEachForMulticast({
          notification: {
            title: "FreshGreen",
            body: "Đơn hàng của bạn đã được xác nhận.",
          },
          tokens: userFiltered.tokens,
        });
      } else if (status === "refuse") {
        await admin.messaging().sendEachForMulticast({
          notification: {
            title: "FreshGreen",
            body: "Đơn hàng của bạn đã bị từ chối.",
          },
          tokens: userFiltered.tokens,
        });
      }

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
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
