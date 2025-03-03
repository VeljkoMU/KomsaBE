const express = require("express");
const PetController = require("../controller/petController");
const multer = require("multer");
const { validateGetPetByLocation, validatePetSetIsLost, validateAddPet } = require("../middleware/validators/petsValidator");
const auth = require("../middleware/auth");
const upload = multer({storage: multer.memoryStorage()});
const router = express.Router();

router.get("/", auth, validateGetPetByLocation, PetController.getPetsByLocation);
router.put("/setIsLost", auth, validatePetSetIsLost, PetController.setIsLost);
router.post("/", auth, validateAddPet, upload.array("imageUrl", 1), PetController.addPet);

module.exports = router;