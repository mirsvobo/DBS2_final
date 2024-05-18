const { createUserPrivateMessageSchema } = require('../schemas/userPrivateMessage');
const ExpressError = require('../utils/ExpressError');

module.exports.validateUserPrivateMessage = (req, res, next) => {
    const { error, value } = createUserPrivateMessageSchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedUserPrivateMessage = value;
        next();
    }
};
