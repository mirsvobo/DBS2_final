const Joi = require('joi');

const createDormitorySchema = Joi.object({
    Adresa: Joi.string().required(),
    Nazev: Joi.string().required()
});

module.exports = {
    createDormitorySchema
};
