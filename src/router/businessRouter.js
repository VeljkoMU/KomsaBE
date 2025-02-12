const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const BusinessController = require("../controller/businessController");

//Add validators
router.get("/", auth, BusinessController.getAll);
router.post("/create", auth, BusinessController.create);
router.get("/:id", auth, BusinessController.getById);
router.put("/:id", auth, BusinessController.update);
router.delete("/delete", auth, BusinessController.delete);
router.get("/proximity", auth, BusinessController.findBusinessByLocation);

module.exports = router;
