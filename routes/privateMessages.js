const express = require('express');
const router = express.Router();
const PrivateMessagesModel = require('../models/PrivateMessageModel');
const catchAsync = require('../utils/catchAsync');

const pool = require('../app.js');
const privateMessagesModel = new PrivateMessagesModel(pool);

router
    .route('/')
    .post(catchAsync(async (req, res) => {
        const messageData = req.body;
        const messageId = await privateMessagesModel.sendMessage(messageData);
        res.status(201).json({ message: 'Zpráva byla odeslána', messageId });
    }));

router
    .route('/:id')
    .get(catchAsync(async (req, res) => {
        const messageId = req.params.id;
        const message = await privateMessagesModel.getMessageById(messageId);
        if (message) {
            res.json(message);
        } else {
            res.status(404).json({ message: 'Zpráva nenalezena' });
        }
    }))
    .delete(catchAsync(async (req, res) => {
        const messageId = req.params.id;
        await privateMessagesModel.deleteMessage(messageId);
        res.json({ message: 'Zpráva byla odstraněna' });
    }));

router
    .route('/user/:userId')
    .get(catchAsync(async (req, res) => {
        const userId = req.params.userId;
        const messages = await privateMessagesModel.getMessagesByUserId(userId);
        res.json(messages);
    }));

module.exports = router;
