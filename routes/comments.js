const express = require('express');
const router = express.Router({ mergeParams: true });
const {
    createComment,
    updateComment,
    deleteComment,
    getCommentById
} = require('../controllers/CommentController');
const { isLoggedIn, isAuthorOrAdmin } = require('../middleware/auth');

// Definice cesty pro vytvoření nového komentáře
router.post('/', isLoggedIn, createComment);

// Definice cesty pro zobrazení formuláře pro úpravu komentáře
router.get('/:commentId/edit', isLoggedIn, isAuthorOrAdmin, getCommentById);

// Definice cesty pro aktualizaci komentáře
router.put('/:commentId', isLoggedIn, isAuthorOrAdmin, updateComment);

// Definice cesty pro smazání komentáře
router.delete('/:commentId', isLoggedIn, isAuthorOrAdmin, deleteComment);

module.exports = router;
