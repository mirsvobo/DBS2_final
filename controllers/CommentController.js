const CommentModel = require('../models/CommentModel');
const pool = require('../db'); // Import poolu z db.js

const commentModel = new CommentModel(pool);

const getAllComments = async (req, res) => {
    const postId = req.params.postId;
    try {
        const comments = await commentModel.getCommentsByPostId(postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createComment = async (req, res) => {
    const postId = req.params.postId;
    const { Obsah_komentare } = req.body;
    const UzivatelID = req.session.user.UzivatelID;
    try {
        const newCommentId = await commentModel.createComment({ Obsah_komentare, PrispevekID: postId, UzivatelID });
        res.status(201).redirect(`/posts/${postId}`); // Přesměrování na detail příspěvku po vytvoření komentáře
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCommentById = async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const comment = await commentModel.getCommentById(commentId);
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ message: 'Komentář nenalezen' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateComment = async (req, res) => {
    const commentId = req.params.commentId;
    const { Obsah_komentare } = req.body;
    try {
        await commentModel.updateComment(commentId, { Obsah_komentare });
        res.json({ message: 'Komentář byl aktualizován' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    try {
        await commentModel.deleteComment(commentId);
        res.json({ message: 'Komentář byl odstraněn' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
};
