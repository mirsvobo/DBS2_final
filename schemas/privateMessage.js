const Joi = require('joi');

const createPrivateMessageSchema = Joi.object({
    Obsah: Joi.string().required(),
    OdesilatelID: Joi.number().integer().required(),
    PrijemceID: Joi.number().integer().required()
});

module.exports = {
    createPrivateMessageSchema
};
