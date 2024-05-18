const Joi = require('joi');

const createUniversitySchema = Joi.object({
    Adresa: Joi.string().required(),
    Nazev: Joi.string().required()
});

module.exports = {
    createUniversitySchema
};
