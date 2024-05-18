const express = require('express');
const router = express.Router();
const PostModel = require('../models/PostModel');
const catchAsync = require('../utils/catchAsync');

const pool = require('../app');
const postModel = new PostModel(pool);

router
    .route('/')
    .get(catchAsync(async (req, res) => {
        const posts = await postModel.getAllPosts();
        res.json(posts);
    }))
    .post(catchAsync(async (req, res) => {
        const postData = req.body;
        const postId = await postModel.addPost(postData);
        res.status(201).json({ message: 'Příspěvek byl vytvořen', postId });
    }));

router
    .route('/:id')
    .get(catchAsync(async (req, res) => {
        const postId = req.params.id;
        const post = await postModel.getPostById(postId);
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Příspěvek nenalezen' });
        }
    }))
    .put(catchAsync(async (req, res) => {
        const postId = req.params.id;
        const newData = req.body;
        await postModel.updatePost(postId, newData);
        res.json({ message: 'Příspěvek byl aktualizován' });
    }))
    .delete(catchAsync(async (req, res) => {
        const postId = req.params.id;
        await postModel.deletePost(postId);
        res.json({ message: 'Příspěvek byl odstraněn' });
    }));

module.exports = router;
