const Category = require("../models/Category.model");
module.exports.categoryController = {
  postCategory: async (req, res) => {
    try {
      const { title, description } = req.body;
      await Category.create({ title, description });
      res.json("Категория добавлена");
    } catch (err) {
      res.json({ err: "Произошла ошибка при добавлении категории" });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);
      if (!category) {
        return res.json("Категория не найдена");
      }
      res.json("Категория удалена");
    } catch (err) {
      res.json({ err: "Произошла ошибка при удалении категории" });
    }
  },
  patchCategory: async (req, res) => {
    try {
      const { title, description } = req.body;
      const category = await Category.findByIdAndUpdate(req.params.id, {
        title,
        description,
      });
      if (!category) {
        res.json("Категория не найдена");
      }
      res.json("Категория обновлена");
    } catch (err) {
      res.json({ err: "Произошла ошибка при обновлении информации категории" });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.json("Категория не найдена");
      }
      res.json(category);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации категории" });
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const category = await Category.find();
      if (category.length === 0) {
        return res.json("Категорий пока нет...");
      }
      res.json(category);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации категории" });
    }
  },
};
