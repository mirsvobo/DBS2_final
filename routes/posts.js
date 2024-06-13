const express = require('express');
const router = express.Router();
const {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    showCreatePostForm,
    getPostForEdit
} = require('../controllers/PostController');
const {
    createComment,
    updateComment,
    deleteComment,
    getCommentById
} = require('../controllers/CommentController');
const { isLoggedIn, isAuthorOrAdmin } = require('../middleware/auth');

// Příspěvky
router.get('/', getAllPosts);
router.get('/new', isLoggedIn, showCreatePostForm);
router.post('/', isLoggedIn, createPost);
router.get('/:id', getPostById);
router.get('/:id/edit', isLoggedIn, isAuthorOrAdmin, (req, res) => { res.render('editPost', { user: req.session.user }); }); // Přidána trasa pro editaci
router.put('/:id', isLoggedIn, isAuthorOrAdmin, updatePost);
router.delete('/:id', isLoggedIn, isAuthorOrAdmin, deletePost);
router.get('/:id/edit', isLoggedIn, isAuthorOrAdmin, getPostForEdit);

// Komentáře
router.post('/:postId/comments', isLoggedIn, createComment);
router.get('/:postId/comments/:commentId/edit', isLoggedIn, isAuthorOrAdmin, getCommentById);
router.put('/:postId/comments/:commentId', isLoggedIn, isAuthorOrAdmin, updateComment);
router.delete('/:postId/comments/:commentId', isLoggedIn, isAuthorOrAdmin, deleteComment);

module.exports = router;
