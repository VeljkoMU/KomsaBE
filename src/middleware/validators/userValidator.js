const { check, validationResult, query } = require("express-validator");

const validateGetUserByEmail = [
    query("email")
    .isEmail()
    .exists(),
    (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            next();
    }
];

const validateGetUserByAddress = [
    query("address")
    .exists(),
    (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            next();
    }
];

const validateUpdateUser = [
    check("email")
    .isEmail()
    .exists(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateGetUserByAddress,
    validateGetUserByEmail,
    validateUpdateUser
};