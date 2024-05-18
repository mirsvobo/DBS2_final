const express = require('express');
const AuthController = require('../controllers/AuthController');
const authController = new AuthController();

const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', authController.register.bind(authController));
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', authController.login.bind(authController));
router.post('/logout', authController.logout.bind(authController));

module.exports = router;
