const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch (err.code) {
            case "string.empty":
                err.message = "Pole jest wymagane";
                break;
            case "string.min":
                err.message = `Pole powinno zawierać co najmniej ${err.local.limit} znaki`;
                break;
            case "string.max":
                err.message = `Pole powinno zawierać co najwyżej ${err.local.limit} znaki`;
                break;
            default:
                break;
        }
    });
    return errors;
}

const gameSchema = Joi.object({
    idGry: 
        Joi.number()
        .optional()
        .allow(""),
    nazwa: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    gatunek: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
    edycja: Joi.string()
        .min(2)
        .max(60)
        .required()
        .error(errMessages),
});



module.exports = gameSchema;