const Joi = require('joi');

module.exports.createPostSchema = Joi.object({
    title: Joi.string().max(255).required(),
    content: Joi.string().max(1000).required(),
});
