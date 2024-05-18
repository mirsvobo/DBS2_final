const { createReportSchema } = require('../schemas/report');
const ExpressError = require('../utils/ExpressError');

module.exports.validateReport = (req, res, next) => {
    const { error, value } = createReportSchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedReport = value;
        next();
    }
};
