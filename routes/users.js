const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { isLoggedIn } = require('../middleware/auth');

const userController = new UserController();

router.get('/', userController.getAllUsers.bind(userController));
router.post('/', userController.addUser.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));
router.post('/profile/:id', isLoggedIn, userController.updateProfile.bind(userController));

module.exports = router;
