const express = require("express");
const AuthController = require("../controller/authController");
const authRounter = express.Router();
const validators = require("../middleware/validators/authValidator");
const auth = require("../middleware/auth");

authRounter.post("/register", validators.validateRegister, AuthController.register);
authRounter.post("/login", validators.validateLogin, AuthController.login);
authRounter.post("/oatuhgoogle", AuthController.googleLogin);
authRounter.post("/logout", auth, AuthController.logout);
authRounter.delete("/delete", auth, validators.validateDeleteAccount, AuthController.deleteAccount);

module.exports = authRounter;