const Joi = require('joi');

const createCommentSchema = Joi.object({
    Obsah: Joi.string().required(),
    PrispevekID: Joi.number().integer().required(),
    UzivatelID: Joi.number().integer().required()
});

module.exports = {
    createCommentSchema
};
