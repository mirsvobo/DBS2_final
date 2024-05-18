const { createPrivateMessageSchema } = require('../schemas/privateMessage');
const ExpressError = require('../utils/ExpressError');

module.exports.validatePrivateMessage = (req, res, next) => {
    const { error, value } = createPrivateMessageSchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedPrivateMessage = value;
        next();
    }
};
