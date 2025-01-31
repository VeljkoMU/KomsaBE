const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const validators = require("../middleware/validators/userValidator");
const UserController = require("../controller/userController");

router.get("/email", auth, validators.validateGetUserByEmail, UserController.getUserByEmail);
router.get("/address", auth, validators.validateGetUserByAddress, UserController.getUserByAddress);
router.get("/proximity", auth, UserController.findUsersByLocation);
router.put("/update", auth, validators.validateUpdateUser, UserController.updateUser);

module.exports = router;