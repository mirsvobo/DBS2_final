const Joi = require('joi');

const createUserPrivateMessageSchema = Joi.object({
    SoukromazpravaID: Joi.number().integer().required(),
    UzivatelID: Joi.number().integer().required()
});

module.exports = {
    createUserPrivateMessageSchema
};
