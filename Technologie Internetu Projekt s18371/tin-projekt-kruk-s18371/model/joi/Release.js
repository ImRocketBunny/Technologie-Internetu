const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "number.empty":
                err.message = "Pole jest wymagane";
                break;
            case "number.min":
                err.message = `Wartość musi być wyższa niż ${err.local.limit}`;
                break;
            case "number.base":
                 err.message = `Pole jest wymagane`;
                break;
            case "date.base":
                 err.message = `Pole jest wymagane`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const releaseSchema = Joi.object({
    idWydania: 
        Joi.number()
        .optional()
        .allow(""),
    releaseDate: Joi.date()
        .required()
        .error(errMessages),
    price: Joi.number()
        .min(0)
        .required()
        .error(errMessages),
    version: Joi.number()
        .min(0)
        .required()
        .error(errMessages),
    gra: Joi.number()
        .required()
        .error(errMessages),
    platforma: Joi.number()
        .required()
        .error(errMessages)
});



module.exports = releaseSchema;