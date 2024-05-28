const express = require('express');
const router = express.Router();
const {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    showCreatePostForm
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
router.get('/new', isLoggedIn, showCreatePostForm); // Přidáno
router.post('/', isLoggedIn, createPost);
router.get('/:id', getPostById);
router.put('/:id', isLoggedIn, isAuthorOrAdmin, updatePost);
router.delete('/:id', isLoggedIn, isAuthorOrAdmin, deletePost);

// Komentáře
router.post('/:postId/comments', isLoggedIn, createComment);
router.get('/:postId/comments/:commentId/edit', isLoggedIn, getCommentById);
router.put('/:postId/comments/:commentId', isLoggedIn, updateComment);
router.delete('/:postId/comments/:commentId', isLoggedIn, deleteComment);

module.exports = router;
