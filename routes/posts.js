const express = require('express');
const router = express.Router();
const {
    getAllPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost
} = require('../controllers/PostController');
const { isLoggedIn, isAuthorOrAdmin } = require('../middleware/auth');

// Definice cesty pro získání všech příspěvků
router.get('/', getAllPosts);

// Definice cesty pro vytvoření nového příspěvku
router.get('/new', isLoggedIn, (req, res) => {
    res.render('newPost', { user: req.session.user });
});
router.post('/', isLoggedIn, createPost);

// Definice cesty pro získání jednoho příspěvku podle ID
router.get('/:id', getPostById);

// Definice cesty pro aktualizaci příspěvku
router.put('/:id', isLoggedIn, isAuthorOrAdmin, updatePost);

// Definice cesty pro smazání příspěvku
router.delete('/:id', isLoggedIn, isAuthorOrAdmin, deletePost);

module.exports = router;
