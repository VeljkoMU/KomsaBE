const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const BusinessController = require("../controllers/BusinessController");
const {
  validateCreateBusiness,
  validateBusinessId,
  validateProximityQuery,
} = require("../middleware/validators/businessValidator");

router.get("/", auth, BusinessController.getAll);
router.post("/create", auth, validateCreateBusiness, BusinessController.create);
router.get("/:id", auth, validateBusinessId, BusinessController.getById);
router.put(
  "/:id",
  auth,
  validateBusinessId,
  validateCreateBusiness,
  BusinessController.update
);
router.delete("/:id", auth, validateBusinessId, BusinessController.delete);
router.get(
  "/proximity",
  auth,
  validateProximityQuery,
  BusinessController.findBusinessByLocation
);

module.exports = router;
