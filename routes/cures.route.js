const { Router } = require("express");
const { cureController } = require("../controllers/cures.controller");

const router = Router();

router.post("/admin/cure", cureController.postCure);
router.delete("/admin/cure/:id", cureController.deleteCure);
router.patch("/admin/cure/:id", cureController.patchCure);
router.get("/admin/cure/:id", cureController.getCureById);
router.get("/admin/cures", cureController.getAllCures);
router.get("/admin/category/:id/cures", cureController.getCategoryCures);
router.get("/cure/:id", cureController.getCureById);
router.get("/cures", cureController.getAllCures);
router.get("/category/:id/cures", cureController.getCategoryCures);

module.exports = router;
