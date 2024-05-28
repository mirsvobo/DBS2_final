const { verifyToken } = require('../utils/auth');
const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');
const pool = require('../db');

const userModel = new UserModel(pool);
const postModel = new PostModel(pool);

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
    try {
        const post = await postModel.getPostById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Příspěvek nenalezen' });
        }
        if (post.UzivatelID !== userId && req.session.user.OpravneniID !== 3) {
            return res.status(403).json({ message: 'Nemáte oprávnění k úpravě tohoto příspěvku' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    authenticate,
    authorize,
    isLoggedIn,
    isAuthorOrAdmin
};
