const { createLikeSchema } = require('../schemas/like');
const ExpressError = require('../utils/ExpressError');

module.exports.validateLike = (req, res, next) => {
    const { error, value } = createLikeSchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedLike = value;
        next();
    }
};
