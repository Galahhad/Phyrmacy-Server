const User = require("../models/User.model");
const Basket = require("../models/Basket.model");
const Cure = require("../models/Cure.model");
module.exports.userController = {
  postUser: async (req, res) => {
    try {
      const { name, secondName, description, recipe, wallet } = req.body;
      const userId = await User.create({
        name,
        secondName,
        description,
        recipe,
        wallet,
      });
      await Basket.create({ user: userId._id });
      res.json("Пользователь добавлен");
    } catch (err) {
      res.json({ err: "Произошла ошибка при создании пользователя" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      await Basket.findOneAndDelete({ user: req.params.id });
      if (!user) {
        return res.json("Пользователь не найден");
      }
      res.json("Пользователь удален");
    } catch (err) {
      res.json({ err: "Произошла ошибка при создании пользователя" });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.json("Пользователь не найден");
      }
      res.json(user);
    } catch (err) {
      res.json({ err: "Произошла ошибка при создании пользователя" });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      if (user.length === 0) {
        return res.json("Пользователей пока нет...");
      }
      res.json(user);
    } catch (err) {
      res.json({ err: "Произошла ошибка при создании пользователя" });
    }
  },
  getUsersByRecipe: async (req, res) => {
    try {
      const user = await User.find({ recipe: true });
      if (user.length === 0) {
        return res.json("Пользователей с рецептами пока нет...");
      }
      res.json(user);
    } catch (err) {
      res.json({ err: "Произошла ошибка при создании пользователя" });
    }
  },
  getBasketById: async (req, res) => {
    try {
      const data = await Basket.findById(req.params.id).populate(
        "user cures",
        "name title"
      );
      if (!data) {
        return res.json("Корзина не найдена");
      }
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации о корзине" });
    }
  },
  getAllBaskets: async (req, res) => {
    try {
      const data = await Basket.find().populate("user cures", "name title");
      if (data.length === 0) {
        return res.json("Корзин пока нет...");
      }
      res.json(data);
    } catch (err) {
      res.json({ err: "Произошла ошибка при получении информации о корзинах" });
    }
  },
  patchUser: async (req, res) => {
    try {
      const { name, secondName, description, recipe } = req.body;
      const data = await User.findByIdAndUpdate(req.params.id, {
        name,
        secondName,
        description,
        recipe,
      });
      if (!data) {
        return res.json("Пользователь не найден");
      }
      res.json("Информация пользователя обновлена");
    } catch (err) {
      res.json({
        err: "Произошла ошибка при обновлении информации о пользователе",
      });
    }
  },
  addMoney: async (req, res) => {
    try {
      const wallet = req.body.wallet;
      const user = await User.findByIdAndUpdate(req.params.id, { wallet });
      res.json(
        `Баланс пользователя ${req.params.id} пополнен на сумму ${wallet}`
      );
      if (!user) {
        return res.json("Пользователь не найден");
      }
    } catch (err) {
      res.json({ err: "Произошла ошибка при создании пользователя" });
    }
  },
  addCureByBasket: async (req, res) => {
    try {
      const cures = await Cure.findById(req.params.cures);
      const basket = await Basket.findById(req.params.bask);
      const user = await User.findById(basket.user);
      const totalPrice = basket.totalPrice + cures.price;
      if (basket.cures.includes(req.params.cures)) {
        return res.json("Это лекарство уже в корзине");
      }
      if (!user.recipe && cures.isRecipe) {
        return res.json("У пользователя корзины нет рецепта");
      }
      await Basket.findByIdAndUpdate(req.params.bask, {
        $addToSet: { cures },
        totalPrice,
      });
      res.json("Лекарство добавлено в корзину");
    } catch (err) {
      res.json({ err: "Произошла ошибка при обновлении корзины" });
    }
  },
  deleteCureByBasket: async (req, res) => {
    try {
      const basket = await Basket.findById(req.params.bask);
      const cures = await Cure.findById(req.params.cures);
      const totalPrice = basket.totalPrice - cures.price;
      if (!basket.cures.includes(req.params.cures)) {
        return res.json("Этого лекарства нет в корзине");
      }
      await Basket.findByIdAndUpdate(req.params.bask, {
        $pull: { cures: req.params.cures },
        totalPrice,
      });
      res.json("Лекарство удалено из корзины");
    } catch (err) {
      res.json("Произошла ошибка при обновлении корзины");
    }
  },
  clearBasket: async (req, res) => {
    try {
      await Basket.findByIdAndUpdate(req.params.id, {
        cures: [],
        totalPrice: 0,
      });
      res.json("Корзина очищена");
    } catch (err) {
      res.json({ err: "Произошла ошибка при очистке корзины" });
    }
  },
  buyCureInBasket: async (req, res) => {
    try {
      const basket = await Basket.findById(req.params.bask);
      const user = await User.findById(basket.user);
      const cures = await Cure.findById(req.params.cures);
      const totalPrice = basket.totalPrice - cures.price;
      const wallet = user.wallet - cures.price;
      if (!basket.cures.includes(req.params.cures)) {
        return res.json("Этого товара нет в корзине");
      }
      if (user.wallet < cures.price) {
        return res.json("Недостаточно средств на счету");
      }
      await Basket.findByIdAndUpdate(req.params.bask, {
        $pull: { cures: req.params.cures },
        totalPrice,
      });
      await User.findByIdAndUpdate(user, { wallet });
      res.json("Покупка совершена");
    } catch (err) {
      res.json({ err: "Произошла ошибка при покупке товара" });
    }
  },
  buyAllCuresInBasket: async (req, res) => {
    try {
      const basket = await Basket.findById(req.params.bask);
      const user = await User.findById(basket.user);
      const wallet = user.wallet - basket.totalPrice;
      if (basket.cures.length === 0) {
        return res.json("Корзина пуста");
      }
      if (user.wallet < basket.totalPrice) {
        return res.json("Недостаточно средств на счету");
      }
      await Basket.findByIdAndUpdate(req.params.bask, {
        cures: [],
        totalPrice: 0,
      });
      await User.findByIdAndUpdate(basket.user, { wallet });
      res.json("Все товары куплены");
    } catch (err) {
      res.json({ err: "Произошла ошибка при покупке товара" });
    }
  },
};
