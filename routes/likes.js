const express = require('express');
const router = express.Router();
const LikeTableModel = require('../models/LikeTableModel');
const catchAsync = require('../utils/catchAsync');

const pool = require('../app.js');
const likeTableModel = new LikeTableModel(pool);

router
    .route('/')
    .post(catchAsync(async (req, res) => {
        const likeData = req.body;
        const likeId = await likeTableModel.addLike(likeData);
        res.status(201).json({ message: 'Like byl přidán', likeId });
    }));

router
    .route('/post/:postId')
    .get(catchAsync(async (req, res) => {
        const postId = req.params.postId;
        const likes = await likeTableModel.getLikesByPostId(postId);
        res.json(likes);
    }));

router
    .route('/:id')
    .delete(catchAsync(async (req, res) => {
        const likeId = req.params.id;
        await likeTableModel.deleteLike(likeId);
        res.json({ message: 'Like byl odstraněn' });
    }));

module.exports = router;
