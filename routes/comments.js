const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');
const { isLoggedIn } = require('../middleware/auth');
const catchAsync = require('../utils/catchAsync');

// Create new comment form
router.get('/new/:postId', isLoggedIn, catchAsync(CommentController.renderNewForm));

// Create new comment
router.post('/:postId', isLoggedIn, catchAsync(CommentController.createComment));

module.exports = router;
