const express = require('express');
const UserController = require('../controllers/UserController');
const catchAsync = require('../utils/catchAsync');
const { validateUser } = require('../middleware/user-validation');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

const userController = new UserController();

router.route('/')
    .get(catchAsync(userController.getAllUsers.bind(userController)))
    .post(validateUser, catchAsync(userController.addUser.bind(userController)));

router.route('/:id')
    .get(catchAsync(userController.getUserById.bind(userController)))
    .put(authenticate, authorize([2, 3]), catchAsync(userController.updateUser.bind(userController)))
    .delete(authenticate, authorize([3]), catchAsync(userController.deleteUser.bind(userController))); // pouze admin

module.exports = router;
