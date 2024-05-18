const express = require('express');
const router = express.Router();
const UserPrivateMessageModel = require('../models/UserPrivateMessageModel');
const catchAsync = require('../utils/catchAsync');

const pool = require('../app.js');
const userPrivateMessageModel = new UserPrivateMessageModel(pool);

router
    .route('/')
    .post(catchAsync(async (req, res) => {
        const userPrivateMessageData = req.body;
        const userPrivateMessageId = await userPrivateMessageModel.addUserPrivateMessage(userPrivateMessageData);
        res.status(201).json({ message: 'Uživatelská zpráva byla přidána', userPrivateMessageId });
    }));

router
    .route('/user/:userId')
    .get(catchAsync(async (req, res) => {
        const userId = req.params.userId;
        const userPrivateMessages = await userPrivateMessageModel.getUserPrivateMessagesByUserId(userId);
        res.json(userPrivateMessages);
    }));

router
    .route('/')
    .delete(catchAsync(async (req, res) => {
        const userPrivateMessageId = req.body;
        await userPrivateMessageModel.deleteUserPrivateMessage(userPrivateMessageId);
        res.json({ message: 'Uživatelská zpráva byla odstraněna' });
    }));

module.exports = router;
