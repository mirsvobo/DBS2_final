const { createPostPostTypeSchema } = require('../schemas/postPostType');
const ExpressError = require('../utils/ExpressError');

module.exports.validatePostPostType = (req, res, next) => {
    const { error, value } = createPostPostTypeSchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedPostPostType = value;
        next();
    }
};
