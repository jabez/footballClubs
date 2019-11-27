const { check, validationResult } = require('express-validator');

const stadiumValidation = [
    check('name')
        .not().isEmpty().withMessage("name is a required field.")
        .isLength({ max: 50 }).withMessage('Password must be 50 characters or less.'),
    check('built')
        .not().isEmpty().withMessage("built is a required field.")
        .isLength({ max: 10, min: 10 }).withMessage('built must be 10 characters. Ex: DD/MM/YYYY')
        .matches(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).withMessage("Built should be DD/MM/YYYY."),
    check('capacity')
        .not().isEmpty().withMessage("Capacity is a required field.")
        .isNumeric().withMessage("Capacity should be a number")
        .isInt({ min: 1 }).withMessage("Capacity is not valid"),
];

const clubValidation = [
    check('fullName')
        .not().isEmpty().withMessage("fullName is a required field.")
        .isLength({ max: 50 }).withMessage('fullName must be 50 characters or less.'),
    check('country')
        .not().isEmpty().withMessage("country is a required field.")
        .isLength({ max: 50 }).withMessage('country must be 50 characters or less.'),
    check('founded')
        .not().isEmpty().withMessage("founded is a required field.")
        .isLength({ max: 10, min: 10 }).withMessage('founded must be 10 characters. Ex: DD/MM/YYYY')
        .matches(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/).withMessage("Built should be DD/MM/YYYY."),
    check('site')
        .not().isEmpty().withMessage("site is a required field.")
        .isLength({ max: 50 }).withMessage('site must be 50 characters or less.'),
    check('idStadium')
        .not().isEmpty().withMessage("idStadium is a required field."),
];

const idClubValidation = [
    check('idClub')
        .not().isEmpty().withMessage("idClub is a required field.")
        .isLength({ min: 24, max: 24 }).withMessage('idClub must be 24 characters.'),
];

const idStadiumValidation = [
    check('idStadium')
        .not().isEmpty().withMessage("idStadium is a required field.")
        .isLength({ min: 24, max: 24 }).withMessage('idStadium must be 24 characters.'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    stadiumValidation,
    clubValidation,
    validate,
    idClubValidation,
    idStadiumValidation
}