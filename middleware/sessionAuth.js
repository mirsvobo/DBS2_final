// middleware/sessionAuth.js
const { getPostById } = require('../models/PostModel');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    next();
};

module.exports.isAuthorOrAdmin = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.session.user.UzivatelID;
    const post = await getPostById(postId);
    if (post.UzivatelID !== userId && req.session.user.OpravneniID !== 3) {
        return res.redirect('/');
    }
    next();
};
