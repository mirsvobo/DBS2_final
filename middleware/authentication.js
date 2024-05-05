// authMiddleware.js

const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');
const bcrypt = require('bcrypt');
const ExpressError = require('../utils/ExpressError');

// Middleware pro ověření, zda je uživatel přihlášen
const isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        throw new ExpressError('Uživatel není přihlášen.', 401);
    } else {
        console.log('Uživatel je přihlášen.');
        next();
    }
};

// Middleware pro ověření, zda je uživatel autorem inzerátu
const isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const { userId } = req.session;

    try {
        const post = await PostModel.getPostById(id);
        if (!post) {
            throw new ExpressError('Inzerát nebyl nalezen.', 404);
        }
        if (post.author !== userId) {
            throw new ExpressError('Nemáte dostatečná oprávnění k provedení této akce.', 403);
        }
        console.log('Uživatel je autorem inzerátu.');
        next();
    } catch (error) {
        next(error);
    }
};

// Middleware pro ověření přihlašovacích údajů uživatele
const areCredentialsVerified = async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const userModel = new UserModel();
        const user = await userModel.getUserByUsername(username);
        if (!user) {
            throw new ExpressError('Chybné přihlašovací údaje.', 401);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ExpressError('Chybné přihlašovací údaje.', 401);
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { isLoggedIn, isAuthor, areCredentialsVerified };
