const { query, body, check } = require("express-validator");

const validateGetFeed = [
    query("place")
    .isString()
    .exists(),
    query("page")
    .isInt()
    .exists(),
    query("lat")
    .isDecimal()
    .exists(),
    query("long")
    .isDecimal()
    .exists(),
    (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            next();
          }
];

const validateCreateFeedPost = [
    check("userId")
    .exists(),
    check("place")
    .isString()
    .exists(),
    check("text")
    .isString()
    .exists(),
    check("lat")
    .isDecimal()
    .exists(),
    check("long")
    .isDecimal()
    .exists(),
    check("images")
    .isArray()
    .optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]

module.exports = {
    validateGetFeed,
    validateCreateFeedPost
}