const { Router } = require("express");
const { categoryController } = require("../controllers/categories.controllers");

const router = Router();

router.post("/admin/category", categoryController.postCategory);
router.delete("/admin/category/:id", categoryController.deleteCategory);
router.patch("/admin/category/:id", categoryController.patchCategory);
router.get("/admin/category/:id", categoryController.getCategoryById);
router.get("/admin/categories", categoryController.getAllCategories);
router.get("/category/:id", categoryController.getCategoryById);
router.get("/categories", categoryController.getAllCategories);

module.exports = router;
