const express = require('express');
const router = express.Router();
const CommentModel = require('../models/CommentModel');
const catchAsync = require('../utils/catchAsync');

const pool = require('../app.js');
const commentModel = new CommentModel(pool);

router
    .route('/')
    .get(catchAsync(async (req, res) => {
        const comments = await commentModel.getAllComments();
        res.json(comments);
    }))
    .post(catchAsync(async (req, res) => {
        const commentData = req.body;
        const commentId = await commentModel.addComment(commentData);
        res.status(201).json({ message: 'Komentář byl vytvořen', commentId });
    }));

router
    .route('/:id')
    .get(catchAsync(async (req, res) => {
        const commentId = req.params.id;
        const comment = await commentModel.getCommentById(commentId);
        if (comment) {
            res.json(comment);
        } else {
            res.status(404).json({ message: 'Komentář nenalezen' });
        }
    }))
    .put(catchAsync(async (req, res) => {
        const commentId = req.params.id;
        const newData = req.body;
        await commentModel.updateComment(commentId, newData);
        res.json({ message: 'Komentář byl aktualizován' });
    }))
    .delete(catchAsync(async (req, res) => {
        const commentId = req.params.id;
        await commentModel.deleteComment(commentId);
        res.json({ message: 'Komentář byl odstraněn' });
    }));

// Nová trasa pro získání všech komentářů podle ID příspěvku
router
    .route('/post/:postId')
    .get(catchAsync(async (req, res) => {
        const postId = req.params.postId;
        const comments = await commentModel.getCommentsByPostId(postId);
        res.json(comments);
    }));

module.exports = router;
