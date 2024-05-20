const Joi = require('joi');

const createCommentSchema = Joi.object({
    Obsah_komentare: Joi.string().required(),
    PrispevekID: Joi.number().integer().required(),
    Cas_odeslani: Joi.date().required(),
    UzivatelID: Joi.number().integer().required()
});

module.exports = {
    createCommentSchema
};
