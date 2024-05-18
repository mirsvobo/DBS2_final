const { createCommentSchema } = require('../schemas/comment');
const ExpressError = require('../utils/ExpressError');

module.exports.validateComment = (req, res, next) => {
    const { error, value } = createCommentSchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedComment = value;
        next();
    }
};
