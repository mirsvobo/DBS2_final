const Joi = require('joi');

const createPermissionSchema = Joi.object({
    Moderator: Joi.boolean().required(),
    Povoleni_hlaseni: Joi.boolean().required(),
    Povoleni_komentare: Joi.boolean().required(),
    Povoleni_prispevky: Joi.boolean().required(),
    Povoleni_zpravy: Joi.boolean().required()
});

module.exports = {
    createPermissionSchema
};
