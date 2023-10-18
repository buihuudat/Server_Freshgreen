const { OpenAI } = require("openai");
const Product = require("../models/Product");

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
      return res.status(200).json({ message: aiResponse });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

module.exports = messageController;
