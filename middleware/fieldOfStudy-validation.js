const { createFieldOfStudySchema } = require('../schemas/fieldOfStudy');
const ExpressError = require('../utils/ExpressError');

module.exports.validateFieldOfStudy = (req, res, next) => {
    const { error, value } = createFieldOfStudySchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedFieldOfStudy = value;
        next();
    }
};
