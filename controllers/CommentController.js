const CommentModel = require('../models/CommentModel');
const commentModel = new CommentModel();

module.exports = {
    async renderNewForm(req, res) {
        res.render('comments/new', { postId: req.params.postId });
    },

    async createComment(req, res) {
        const { content } = req.body;
        const postId = req.params.postId;
        const userId = req.session.user.UzivatelID;
        await commentModel.createComment({ content, postId, userId });
        res.redirect(`/posts/${postId}`);
    }
};
