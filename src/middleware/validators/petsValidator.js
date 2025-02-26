const { query, check } = require("express-validator");

const validateGetPetByLocation = [
    query("long")
    .isFloat()
    .exists(),
    query("lat")
    .isFloat()
    .exists(),
    query("place")
    .isString()
    .exists(),
    query("page")
    .isInt()
    .exists(),
    query("isLost")
    .isBoolean()
    .optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }];

const validateAddPet = [
    check("userId")
    .exists(),
    check("name")
    .isString()
    .exists(),
    check("type")
    .isString()
    .exists(),
    check("subType")
    .isString()
    .exists(),
    check("age")
    .exists(),
    check("description")
    .isString()
    .exists(),
    check("isLost")
    .isBoolean()
    .exists(),
    check("long")
    .isFloat()
    .exists(),
    check("lat")
    .isFloat()
    .exists(),
    check("place")
    .isString()
    .exists(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }];

    const validatePetSetIsLost = [
        query("userId")
        .isString()
        .exists(),
        query("petId")
        .isString()
        .exists(),
        query("isLost")
        .isBoolean()
        .exists(),
        (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }];

    module.exports = {
        validateAddPet,
        validateGetPetByLocation,
        validatePetSetIsLost
    }