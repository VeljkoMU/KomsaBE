const { check, validationResult, param, query } = require("express-validator");

const validateCreateBusiness = [
  check("name").exists().withMessage("Name is required"),
  check("type").exists().withMessage("Type is required"),
  check("address").exists().withMessage("Address is required"),
  check("place").exists().withMessage("Place is required"),
  check("tags").isArray().withMessage("Tags should be an array"),
  check("isPartner").isBoolean().withMessage("isPartner should be a boolean"),
  check("long").isFloat().withMessage("Invalid longitude"),
  check("lat").isFloat().withMessage("Invalid latitude"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateBusinessId = [
  param("id").isMongoId().withMessage("Invalid business ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateProximityQuery = [
  query("lat").isFloat({ min: -90, max: 90 }).withMessage("Invalid latitude"),
  query("long")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Invalid longitude"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateCreateBusiness,
  validateBusinessId,
  validateProximityQuery,
};
