const { check, validationResult } = require("express-validator");

const validateRegister = [
    check("email")
    .isEmail()
    .exists()
    .withMessage("Email is required"),
    check("password")
    .exists()
    .isString(),
    check("name")
    .exists()
    .isString(),
    check("place")
    .exists()
    .isString(),
    check("country")
    .exists()
    .isString(),
    check("province")
    .exists()
    .isString(),
    check("long")
    .exists()
    .isDecimal(),
    check("lat")
    .exists()
    .isDecimal(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
];

const validateLogin = [
    check("email")
    .exists()
    .isEmail(),
    check("password")
    .exists(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
];

const validateDeleteAccount = [
    check("email")
    .exists()
    .isEmail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      },
];

module.exports = {
    validateRegister,
    validateLogin,
    validateDeleteAccount
};