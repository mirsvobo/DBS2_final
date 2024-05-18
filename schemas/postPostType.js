const Joi = require('joi');

const createPostPostTypeSchema = Joi.object({
    TypprispevkuID: Joi.number().integer().required(),
    PrispevekID: Joi.number().integer().required()
});

module.exports = {
    createPostPostTypeSchema
};
