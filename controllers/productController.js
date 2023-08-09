const Product = require("../models/Product");

const productController = {
  gets: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const totalProducts = await Product.countDocuments();
      const perPage = parseInt(req.query.perPage) || totalProducts;

      const startIndex = (page - 1) * perPage;
      const endIndex = page * perPage;

      const products = await Product.find().skip(startIndex).limit(endIndex);
      return res.status(200).json({ products, page, perPage, totalProducts });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(400).json("Product not found");
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(200).json(error);
    }
  },
  create: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const isExisted = await Product.findOne({ title: req.body.title });
      if (isExisted._id === req.params.id) {
        return res.status(400).json({
          erros: [
            {
              path: "title",
              msg: "Title already used",
            },
          ],
        });
      }
      const product = await Product.findByIdAndUpdate(req.params.id, req.body);
      if (!product) {
        return res.status(400).json("Product not found");
      }
      return res.status(200).json(product);
    } catch (error) {
      return res.status(200).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(400).json("Product not found");
      }
      return res.status(200).json("Product deleted successfully");
    } catch (error) {
      return res.status(200).json(error);
    }
  },

  shopProducts: async (req, res) => {
    try {
      const page = req.query.page || 1;
      const perPage = req.query.perPage || 8;
      const start = (page - 1) * perPage;
      const end = page * perPage;
      const totalProducts = await Product.countDocuments();
      const products = await Product.find({ shop: req.params.id })
        .skip(start)
        .limit(end);
      return res.status(200).json({ products, totalProducts, page, perPage });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = productController;
