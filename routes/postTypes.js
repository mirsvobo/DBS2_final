const express = require('express');
const router = express.Router();
const PostTypeModel = require('../models/PostTypeModel');
const postTypeModel = new PostTypeModel();
const catchAsync = require('../utils/catchAsync');

// GET all post types
router.get('/', catchAsync(async (req, res) => {
    const postTypes = await postTypeModel.getAllPostTypes();
    res.json(postTypes);
}));

// GET post type by ID
router.get('/:id', catchAsync(async (req, res) => {
    const postType = await postTypeModel.getPostTypeById(req.params.id);
    res.json(postType);
}));

// Add more routes for creating, updating, and deleting post types as needed...

module.exports = router;
