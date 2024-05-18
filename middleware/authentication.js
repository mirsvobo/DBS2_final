const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const ExpressError = require('../utils/ExpressError');

const pool = require('../app.js');
const userModel = new UserModel(pool);

module.exports.areCredentialsVerified = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            return next(new ExpressError("Chybné přihlašovací údaje.", 401));
        }
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return next(new ExpressError("Chybné přihlašovací údaje.", 401));
        }
        req.user = user;
        next();
    } catch (error) {
        next(new ExpressError("Nastala chyba při ověřování přihlašovacích údajů.", 500));
    }
};
