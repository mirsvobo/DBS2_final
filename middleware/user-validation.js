const { createUserSchema } = require('../schemas/user');
const ExpressError = require('../utils/ExpressError');

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
