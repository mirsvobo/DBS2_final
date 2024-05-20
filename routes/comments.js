const express = require('express');
const router = express.Router();
const {
    getAllComments,
    createComment,
    getCommentById,
    updateComment,
    deleteComment
} = require('../controllers/CommentController');
const { isLoggedIn, isAuthorOrAdmin } = require('../middleware/auth');

// Definice cesty pro získání všech komentářů pro konkrétní příspěvek
router.get('/posts/:postId/comments', getAllComments);

// Definice cesty pro vytvoření nového komentáře
router.post('/posts/:postId/comments', isLoggedIn, createComment);

// Definice cesty pro získání jednoho komentáře podle ID
router.get('/comments/:commentId', getCommentById);

// Definice cesty pro aktualizaci komentáře
router.put('/comments/:commentId', isLoggedIn, isAuthorOrAdmin, updateComment);

// Definice cesty pro smazání komentáře
router.delete('/comments/:commentId', isLoggedIn, isAuthorOrAdmin, deleteComment);

module.exports = router;
