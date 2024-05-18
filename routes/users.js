const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const catchAsync = require('../utils/catchAsync');
const { validateUser } = require('../middleware/user-validation');
const { authenticate, authorize } = require('../middleware/auth');

const pool = require('../app');
const userController = new UserController(pool);

router
    .route('/')
    .get(authenticate, authorize([3]), catchAsync(userController.getAllUsers)) // pouze admin
    .post(validateUser, catchAsync(userController.addUser));

router
    .route('/:id')
    .get(authenticate, catchAsync(userController.getUserById))
    .put(authenticate, authorize([2, 3]), validateUser, catchAsync(userController.updateUser)) // registrovaný uživatel a admin
    .delete(authenticate, authorize([3]), catchAsync(userController.deleteUser)); // pouze admin

module.exports = router;
