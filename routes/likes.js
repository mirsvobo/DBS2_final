const express = require('express');
const router = express.Router();
const LikeTableModel = require('../models/LikeTableModel');
const catchAsync = require('../utils/catchAsync');
const { validateLike } = require('../middleware/like-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app');
const likeTableModel = new LikeTableModel(pool);

router
    .route('/')
    .post(authenticate, validateLike, catchAsync(async (req, res) => {
        const likeData = req.body;
        likeData.UzivatelID = req.user.id;
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
    .delete(authenticate, catchAsync(async (req, res) => {
        const likeId = req.params.id;
        await likeTableModel.deleteLike(likeId);
        res.json({ message: 'Like byl odstraněn' });
    }));

module.exports = router;
