const { createPermissionSchema } = require('../schemas/permission');
const ExpressError = require('../utils/ExpressError');

module.exports.validatePermission = (req, res, next) => {
    const { error, value } = createPermissionSchema.validate(req.body);
    if (error) {
        const message = error.details.map((e) => e.message).join(',');
        throw new ExpressError(message, 400);
    } else {
        req.validatedPermission = value;
        next();
    }
};
