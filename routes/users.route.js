const { Router } = require("express");
const { userController } = require("../controllers/users.controller");

const router = Router();

router.post("/user", userController.postUser);
router.delete("/user/:id", userController.deleteUser);
router.get("/user/:id", userController.getUserById);
router.get("/users", userController.getAllUsers);
router.get("/users/recipe", userController.getUsersByRecipe);
router.get("/admin/user/:id", userController.getUserById);
router.get("/admin/users", userController.getAllUsers);
router.get("/admin/users/recipe", userController.getUsersByRecipe);
router.get("/admin/basket/:id", userController.getBasketById);
router.get("/admin/baskets", userController.getAllBaskets);
router.patch("/user/:id", userController.patchUser);
router.patch("/user/:id/wallet", userController.addMoney);
router.patch("/bask/:bask/cures/:cures/add", userController.addCureByBasket);
router.patch("/bask/:bask/cures/:cures/delete", userController.deleteCureByBasket);
router.patch("/bask/:id/clear", userController.clearBasket);
router.patch("/bask/:bask/cures/:cures/buy", userController.buyCureInBasket);
router.patch("/bask/:bask/cures/buy", userController.buyAllCuresInBasket);

module.exports = router;
