const Joi = require('joi');

const createFieldOfStudySchema = Joi.object({
    Nazev_oboru: Joi.string().required()
});

module.exports = {
    createFieldOfStudySchema
};
