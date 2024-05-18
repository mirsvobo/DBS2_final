const express = require('express');
const router = express.Router();
const UserPrivateMessageModel = require('../models/UserPrivateMessageModel');
const catchAsync = require('../utils/catchAsync');
const { validateUserPrivateMessage } = require('../middleware/userPrivateMessage-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app');
const userPrivateMessageModel = new UserPrivateMessageModel(pool);

router
    .route('/')
    .post(authenticate, authorize([2, 3]), validateUserPrivateMessage, catchAsync(async (req, res) => {
        const userPrivateMessageData = req.body;
        const userPrivateMessageId = await userPrivateMessageModel.addUserPrivateMessage(userPrivateMessageData);
        res.status(201).json({ message: 'Soukromá zpráva byla přiřazena', userPrivateMessageId });
    }));

router
    .route('/:id')
    .delete(authenticate, authorize([3]), catchAsync(async (req, res) => {
        const userPrivateMessageId = req.params.id;
        await userPrivateMessageModel.deleteUserPrivateMessage(userPrivateMessageId);
        res.json({ message: 'Soukromá zpráva byla odstraněna' });
    }));

module.exports = router;
