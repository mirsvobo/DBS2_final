const express = require('express');
const UserModel = require('../models/UserModel');
const AuthController = require('../controllers/AuthController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();
const userModel = new UserModel();
const authController = new AuthController(userModel);

router.route('/register')
    .get(authController.renderRegister.bind(authController))
    .post(catchAsync(authController.register.bind(authController)));

router.route('/login')
    .get(authController.renderLogin.bind(authController))
    .post(catchAsync(authController.login.bind(authController)));

module.exports = router;
