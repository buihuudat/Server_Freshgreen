const Product = require("../models/Product");

const commentController = {
  getProductComments: async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ error: "Comment not found" });
      }

      const comments = product.comments.map(({ comment }) => comment);

      return res.status(200).json(comments);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = commentController;
