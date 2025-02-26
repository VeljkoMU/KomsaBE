const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const BusinessController = require("../controller/businessController");
const {
  validateCreateBusiness,
  validateBusinessId,
  validateProximityQuery,
} = require("../middleware/validators/businessValidator");

router.get("/", BusinessController.getAll);
router.post("/create", validateCreateBusiness, BusinessController.create);
router.get("/:id", validateBusinessId, BusinessController.getById);
router.put("/:id", validateBusinessId, validateCreateBusiness, BusinessController.update
);
router.delete("/:id", validateBusinessId, BusinessController.delete);
router.get( "/proximity", validateProximityQuery, BusinessController.findBusinessByLocation
);

module.exports = router;
