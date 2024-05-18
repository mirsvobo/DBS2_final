const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (user) => {
    return jwt.sign({ id: user.UzivatelID, role: user.OpravneniID }, secret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};
