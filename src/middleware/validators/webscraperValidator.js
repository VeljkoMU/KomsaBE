const { query, validationResult } = require("express-validator");

const validateNews = [
    query("street")
    .exists()
    .isString(),
    query("city")
    .exists()
    .isString(),
    query("province")
    .exists()
    .isString(),
    query("country")
    .exists()
    .isString(),
    query("address")
    .optional()
    .isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(errors.array().length != 0) {
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = validateNews;