const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const catchAsync = require('../utils/catchAsync');
const { validateUser } = require('../middleware/user-validation');
const { areCredentialsVerified } = require('../middleware/authentication');

const userModel = new (require('../models/UserModel'))(require('../app.js'));
const userController = new UserController(userModel);

router
    .route('/')
    .get(catchAsync(userController.getAllUsers.bind(userController)))
    .post(validateUser, catchAsync(userController.addUser.bind(userController)));

router
    .route('/:id')
    .get(catchAsync(userController.getUserById.bind(userController)))
    .put(catchAsync(userController.updateUser.bind(userController)))
    .delete(catchAsync(userController.deleteUser.bind(userController)));

router
    .route('/username/:username')
    .get(catchAsync(userController.getUserByUsername.bind(userController)));

module.exports = router;
