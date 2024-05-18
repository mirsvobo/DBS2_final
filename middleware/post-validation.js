const { createPostSchema } = require('../schemas/post');
const ExpressError = require('../utils/ExpressError');

module.exports.validatePost = (req, res, next) => {
    const { error, value } = createPostSchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedPost = value;
        next();
    }
};
