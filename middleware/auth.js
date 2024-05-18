const { verifyToken } = require('../utils/auth');
const UserModel = require('../models/UserModel');
const pool = require('../app');

const userModel = new UserModel(pool);

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

module.exports = {
    authenticate,
    authorize
};
