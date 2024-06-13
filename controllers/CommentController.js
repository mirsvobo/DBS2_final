const CommentModel = require('../models/CommentModel');
const PostModel = require('../models/PostModel');
const pool = require('../db'); // Import poolu z db.js

const commentModel = new CommentModel(pool);
const postModel = new PostModel(pool);

const createComment = async (req, res) => {
    const postId = req.params.postId;
    const { Obsah_komentare } = req.body;
    const UzivatelID = req.session.user.UzivatelID;
    try {
        await commentModel.createComment({ Obsah_komentare, PrispevekID: postId, UzivatelID });
        res.redirect(`/posts/${postId}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCommentById = async (req, res) => {
    const commentId = req.params.commentId;
    const postId = req.params.postId; // Přidáme získání postId z parametru
    try {
        const post = await postModel.getPostById(postId); // Zkontrolujeme, zda příspěvek existuje
        if (!post) {
            return res.status(404).json({ message: 'Příspěvek nenalezen' });
        }
        const comment = await commentModel.getCommentById(commentId);
        if (comment) {
            res.render('editComment', { comment, user: req.session.user, postId }); // Předáme postId do šablony
        } else {
            res.status(404).json({ message: 'Komentář nenalezen' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    const commentId = req.params.commentId;
    const postId = req.params.postId; // Přidáme získání postId z parametru
    const { Obsah_komentare } = req.body;
    try {
        const post = await postModel.getPostById(postId); // Zkontrolujeme, zda příspěvek existuje
        if (!post) {
            return res.status(404).json({ message: 'Příspěvek nenalezen' });
        }
        await commentModel.updateComment(commentId, { Obsah_komentare });
        res.redirect(`/posts/${postId}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    const postId = req.params.postId; // Přidáme získání postId z parametru
    try {
        const post = await postModel.getPostById(postId); // Zkontrolujeme, zda příspěvek existuje
        if (!post) {
            return res.status(404).json({ message: 'Příspěvek nenalezen' });
        }
        await commentModel.deleteComment(commentId);
        res.redirect(`/posts/${postId}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createComment,
    getCommentById,
    updateComment,
    deleteComment
};
