const express = require('express');
const router = express.Router();
const PostModel = require('../models/PostModel');
const catchAsync = require('../utils/catchAsync');
const { validatePost } = require('../middleware/post-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app.js');
const postModel = new PostModel(pool);

router
    .route('/')
    .get(catchAsync(async (req, res) => {
        const posts = await postModel.getAllPosts();
        res.json(posts);
    }))
    .post(authenticate, validatePost, catchAsync(async (req, res) => {
        const postData = req.body;
        postData.UzivatelID = req.user.id;
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
    .put(authenticate, authorize([2, 3]), validatePost, catchAsync(async (req, res) => { // 2: registrovaný uživatel, 3: admin
        const postId = req.params.id;
        const newData = req.body;
        await postModel.updatePost(postId, newData);
        res.json({ message: 'Příspěvek byl aktualizován' });
    }))
    .delete(authenticate, authorize([3]), catchAsync(async (req, res) => { // pouze admin
        const postId = req.params.id;
        await postModel.deletePost(postId);
        res.json({ message: 'Příspěvek byl odstraněn' });
    }));

module.exports = router;
