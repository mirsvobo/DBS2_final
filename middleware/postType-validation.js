const { createPostTypeSchema } = require('../schemas/postType');
const ExpressError = require('../utils/ExpressError');

module.exports.validatePostType = (req, res, next) => {
    const { error, value } = createPostTypeSchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedPostType = value;
        next();
    }
};
