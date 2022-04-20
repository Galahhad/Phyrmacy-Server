const Cure = require("../models/Cure.model");
module.exports.cureController = {
  postCure: async (req, res) => {
    try {
      const { title, description, price, isRecipe, cureCategory } = req.body;
      await Cure.create({ title, description, price, isRecipe, cureCategory });
      res.json("Лекарство опубликовано");
    } catch (err) {
      res.json({ err: "Произошла ошибка при публикации лекарства" });
    }
  },
  deleteCure: async (req, res) => {
    try {
      const cure = await Cure.findByIdAndDelete(req.params.id);
      if (!cure) {
        return res.json("Лекарство не найдено");
      }
      res.json("Лекарство удалено");
    } catch (err) {
      res.json({ err: "Произошла ошибка при удалении пользователя" });
    }
  },
  patchCure: async (req, res) => {
    try {
      const { title, description, price, isRecipe, cureCategory } = req.body;
      const cure = await Cure.findByIdAndUpdate(req.params.id, {
        title,
        description,
        price,
        isRecipe,
        cureCategory,
      });
      if (!cure) {
        return res.json("Лекарство не найдено");
      }
      res.json("Информация лекарства обновлена");
    } catch (err) {
      res.json({
        err: "Произошла ошибка при обновлении информации о лекарстве",
      });
    }
  },
  getCureById: async (req, res) => {
    try {
      const data = await Cure.findById(req.params.id).populate(
        "cureCategory",
        "title"
      );
      if (!data) {
        return res.json("Пользователь не найден");
      }
      res.json(data);
    } catch (err) {
      res.json({
        err: "Произошла ошибка при получении информации о лекарствах",
      });
    }
  },
  getAllCures: async (req, res) => {
    try {
      const data = await Cure.find().populate("cureCategory", "title");
      if (data.length === 0) {
        return res.json("Лекарств пока нет...");
      }
      res.json(data);
    } catch (err) {
      res.json({
        err: "Произошла ошибка при получении информации о лекарствах",
      });
    }
  },
  getCategoryCures: async (req, res) => {
    try {
      const data = await Cure.find({ cureCategory: req.params.id }).populate(
        "cureCategory",
        "title"
      );
      if (data.length === 0) {
        res.json("В этой категории пока нет лекарств...");
      }
      res.json(data);
    } catch (err) {
      res.json({
        err: "Произошла ошибка при получении информации о лекарствах",
      });
    }
  },
};
