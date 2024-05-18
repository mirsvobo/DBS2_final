const Joi = require('joi');

const createPostSchema = Joi.object({
    Cas_odeslani: Joi.date().required(),
    Obrazek: Joi.binary().allow(null),
    Obsah_prispevku: Joi.string().required(),
    Typ_prispevku: Joi.string().allow(null),
    UzivatelID: Joi.number().integer().required()
});

module.exports = {
    createPostSchema
};
