const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const { validateUser } = require('../middleware/user-validation');
const catchAsync = require('../utils/catchAsync');

router.post('/login', catchAsync(AuthController.login));
router.post('/register', validateUser, catchAsync(AuthController.register));

module.exports = router;
