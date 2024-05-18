const Joi = require('joi');
const ExpressError = require('../utils/ExpressError');

const createUserSchema = Joi.object({
    Jmeno: Joi.string().required(),
    Prijmeni: Joi.string().required(),
    Username: Joi.string().required(),
    Password: Joi.string().required(),
    OpravneniID: Joi.number().integer().required()
});

module.exports.validateUser = (req, res, next) => {
    const { error, value } = createUserSchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedUser = value;
        next();
    }
};
