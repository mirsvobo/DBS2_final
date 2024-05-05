// validateUserMiddleware.js

const UserModel = require('../models/UserModel');
const ExpressError = require('../utils/ExpressError');

// Middleware pro ověření uživatele
const validateUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const userModel = new UserModel();
        const isValid = await userModel.validateUser(userData); // Metoda pro ověření uživatele ve vašem modelu

        if (!isValid) {
            throw new ExpressError('Neplatné uživatelské údaje', 400);
        }

        req.validatedUser = userData;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = validateUser;
