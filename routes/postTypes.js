const express = require('express');
const router = express.Router();
const PostTypeModel = require('../models/PostTypeModel');
const catchAsync = require('../utils/catchAsync');
const { validatePostType } = require('../middleware/postType-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app');
const postTypeModel = new PostTypeModel(pool);

router
    .route('/')
    .get(catchAsync(async (req, res) => {
        const postTypes = await postTypeModel.getAllPostTypes();
        res.json(postTypes);
    }))
    .post(authenticate, authorize([3]), validatePostType, catchAsync(async (req, res) => {
        const postTypeData = req.body;
        const postTypeId = await postTypeModel.addPostType(postTypeData);
        res.status(201).json({ message: 'Typ příspěvku byl vytvořen', postTypeId });
    }));

router
    .route('/:id')
    .get(catchAsync(async (req, res) => {
        const postTypeId = req.params.id;
        const postType = await postTypeModel.getPostTypeById(postTypeId);
        if (postType) {
            res.json(postType);
        } else {
            res.status(404).json({ message: 'Typ příspěvku nenalezen' });
        }
    }))
    .put(authenticate, authorize([3]), validatePostType, catchAsync(async (req, res) => {
        const postTypeId = req.params.id;
        const newData = req.body;
        await postTypeModel.updatePostType(postTypeId, newData);
        res.json({ message: 'Typ příspěvku byl aktualizován' });
    }))
    .delete(authenticate, authorize([3]), catchAsync(async (req, res) => {
        const postTypeId = req.params.id;
        await postTypeModel.deletePostType(postTypeId);
        res.json({ message: 'Typ příspěvku byl odstraněn' });
    }));

module.exports = router;
