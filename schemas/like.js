const Joi = require('joi');

const createLikeSchema = Joi.object({
    UzivatelID: Joi.number().integer().required(),
    PrispevekID: Joi.number().integer().required()
});

module.exports = {
    createLikeSchema
};
