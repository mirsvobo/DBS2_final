const express = require('express');
const router = express.Router();
const PostPostTypeModel = require('../models/postPostType');
const catchAsync = require('../utils/catchAsync');
const { validatePostPostType } = require('../middleware/postPostType-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app');
const postPostTypeModel = new PostPostTypeModel(pool);

router
    .route('/')
    .post(authenticate, authorize([2, 3]), validatePostPostType, catchAsync(async (req, res) => {
        const postPostTypeData = req.body;
        const postPostTypeId = await postPostTypeModel.addPostPostType(postPostTypeData);
        res.status(201).json({ message: 'Typ příspěvku byl přidán', postPostTypeId });
    }));

router
    .route('/post/:postId')
    .get(catchAsync(async (req, res) => {
        const postId = req.params.postId;
        const postPostTypes = await postPostTypeModel.getPostTypesByPostId(postId);
        res.json(postPostTypes);
    }));

router
    .route('/:id')
    .delete(authenticate, authorize([3]), catchAsync(async (req, res) => {
        const postPostTypeId = req.params.id;
        await postPostTypeModel.deletePostPostType(postPostTypeId);
        res.json({ message: 'Typ příspěvku byl odstraněn' });
    }));

module.exports = router;
