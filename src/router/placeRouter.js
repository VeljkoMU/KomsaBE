const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const PlaceController = require("../controller/placeController");

//Add validators
router.get("/", auth, PlaceController.getAll);
router.post("/create", auth, PlaceController.create);
router.get("/:id", auth, PlaceController.getById);
router.put("/:id", auth, PlaceController.update);
router.delete("/delete", auth, PlaceController.delete);

module.exports = router;
