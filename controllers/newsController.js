const News = require("../models/News");

const newsController = {
  gets: async (req, res) => {
    try {
      const newsList = await News.find();
      return res.status(200).json(newsList);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  create: async (req, res) => {
    try {
      const news = await News.create(req.body);
      return res.status(201).json(news);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  update: async (req, res) => {
    try {
      const news = await News.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!news) {
        return res.status(400).json("News not found");
      }
      return res.status(200).json(news);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  delete: async (req, res) => {
    try {
      const news = await News.findByIdAndDelete(req.params.id);
      if (!news) {
        return res.status(400).json("News not found");
      }
      return res.status(200).json("Deleted news");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = newsController;