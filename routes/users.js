const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const catchAsync = require('../utils/catchAsync');
const { validateUser } = require('../middleware/user-validation');
const { areCredentialsVerified } = require('../middleware/authentication');

const userController = new UserController();

router
    .route('/')
    .get(catchAsync(userController.getAllUsers))
    .post(validateUser, catchAsync(userController.addUser));

router
    .route('/:id')
    .get(catchAsync(userController.getUserById))
    .put(catchAsync(userController.updateUser))
    .delete(catchAsync(userController.deleteUser));

module.exports = router;
