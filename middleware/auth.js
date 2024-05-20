const { verifyToken } = require('../utils/auth');
const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel'); // Import PostModel
const pool = require('../db'); // Import poolu

const userModel = new UserModel(pool);
const postModel = new PostModel(pool); // Inicializace postModel

const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Přístup odepřen. Žádný token nebyl poskytnut.' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Neplatný token.' });
    }

    req.user = decoded;
    next();
};

const authorize = (roles) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Přístup odepřen.' });
        }

        const user = await userModel.getUserById(req.user.id);
        if (!user || !roles.includes(user.OpravneniID)) {
            return res.status(403).json({ message: 'Nemáte dostatečná oprávnění k provedení této akce.' });
        }

        next();
    };
};

const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    next();
};

const isAuthorOrAdmin = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.session.user.UzivatelID;
    const post = await postModel.getPostById(postId);
    if (post.UzivatelID !== userId && req.session.user.OpravneniID !== 3) {
        return res.redirect('/');
    }
    next();
};

module.exports = {
    authenticate,
    authorize,
    isLoggedIn,
    isAuthorOrAdmin
};
