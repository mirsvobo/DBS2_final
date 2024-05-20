const PostModel = require('../models/PostModel');
const CommentModel = require('../models/CommentModel');
const pool = require('../db');

const postModel = new PostModel(pool);
const commentModel = new CommentModel(pool);

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
    const { Titulek, Obsah_prispevku, Typ_prispevku } = req.body;
    const UzivatelID = req.session.user.UzivatelID;
    try {
        const newPostId = await postModel.createPost({ Titulek, Obsah_prispevku, Typ_prispevku, UzivatelID });
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await postModel.getPostById(postId);
        const comments = await commentModel.getCommentsByPostId(postId);
        if (post) {
            res.render('postDetail', { user: req.session.user, post, comments });
        } else {
            res.status(404).json({ message: 'Příspěvek nenalezen' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEditPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await postModel.getPostById(postId);
        if (post) {
            res.render('editPost', { user: req.session.user, post });
        } else {
            res.status(404).json({ message: 'Příspěvek nenalezen' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { Titulek, Obsah_prispevku, Typ_prispevku } = req.body;
    try {
        await postModel.updatePost(postId, { Titulek, Obsah_prispevku, Typ_prispevku });
        res.redirect(`/posts/${postId}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        await postModel.deletePost(postId);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    getEditPost,
    updatePost,
    deletePost
};
