const CommentModel = require('../models/CommentModel');
const PostModel = require('../models/PostModel'); // Přidáme import modelu pro příspěvky
const pool = require('../db');

const commentModel = new CommentModel(pool);
const postModel = new PostModel(pool); // Vytvoříme instanci modelu pro příspěvky

const createComment = async (req, res) => {
    const postId = req.params.postId;
    const { Obsah_komentare } = req.body;
    const UzivatelID = req.session.user.UzivatelID;
    try {
        const post = await postModel.getPostById(postId); // Zkontrolujeme, zda příspěvek existuje
        if (!post) {
            return res.status(404).json({ message: 'Příspěvek nenalezen' });
        }
        await commentModel.createComment({ Obsah_komentare, UzivatelID, PrispevekID: postId });
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
