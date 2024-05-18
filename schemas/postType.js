const Joi = require('joi');

const createPostTypeSchema = Joi.object({
    Typ: Joi.string().required()
});

module.exports = {
    createPostTypeSchema
};
