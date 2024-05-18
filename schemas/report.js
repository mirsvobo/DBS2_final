const Joi = require('joi');

const createReportSchema = Joi.object({
    Cas_hlaseni: Joi.date().required(),
    Obsah_hlaseni: Joi.string().required(),
    KomentarID: Joi.number().integer().required(),
    UzivatelID: Joi.number().integer().required()
});

module.exports = {
    createReportSchema
};
