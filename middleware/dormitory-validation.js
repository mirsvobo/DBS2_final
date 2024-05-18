const { createDormitorySchema } = require('../schemas/dormitory');
const ExpressError = require('../utils/ExpressError');

module.exports.validateDormitory = (req, res, next) => {
    const { error, value } = createDormitorySchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedDormitory = value;
        next();
    }
};
