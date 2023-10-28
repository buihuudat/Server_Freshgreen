const { OpenAI } = require("openai");
const Product = require("../models/Product");
const User = require("../models/User");
const Message = require("../models/Message");
const Shop = require("../models/Shop");

const apiKey = process.env.KEY_GPT;
const openai = new OpenAI({ apiKey });

const messageController = {
  ask: async (req, res) => {
    const { message } = req.body;
    try {
      const products = await Product.find();
      const productName = products.flatMap((product) => product.title);
      const response = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `rules: 
            chỉ trả lời các câu hỏi liên quan tới đồ ăn,
            chỉ đưa ra tên đồ ăn ở trong ${productName},
            ask: ${message}`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      const aiResponse = response.choices;
      return res.status(200).json({ message: aiResponse[0].message.content });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  send: async (req, res) => {
    const { from, to, message } = req.body;
    try {
      const [checkSenderExisted, checkReveicerExisted] = await Promise.all([
        User.findById(from),
        Shop.findById(to),
      ]);
      if (!checkSenderExisted)
        return res.status(404).json({ message: "Sender not existed" });
      if (!checkReveicerExisted)
        return res.status(404).json({ message: "Reveicer not existed" });

      const addMessage = await Message.create({
        users: [from, to],
        message: {
          text: message.text,
          image: message.image,
        },
        sender: from,
      });

      return res.status(201).json(addMessage);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  get: async (req, res) => {
    const { from, to } = req.params;
    try {
      const messages = await Message.find({
        users: {
          $all: [from, to],
        },
      })
        .sort({ updatedAt: 1 })
        .limit(50);

      const messData = messages.map((mess) => {
        return {
          fromSelf: mess.sender.toString() === from,
          message: mess.message?.text || mess.message?.image,
        };
      });
      return res.status(200).json(messData);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = messageController;
