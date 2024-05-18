const { createUniversitySchema } = require('../schemas/university');
const ExpressError = require('../utils/ExpressError');

module.exports.validateUniversity = (req, res, next) => {
    const { error, value } = createUniversitySchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedUniversity = value;
        next();
    }
};
