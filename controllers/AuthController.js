const UserModel = require('../models/UserModel');
const bcrypt = require('bcrypt');
const logger = require('../logger');

class AuthController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    renderRegister(req, res) {
        res.render('register');
    }

    async register(req, res) {
        const { username, email, password, firstName, lastName } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = {
                Username: username,
                Email: email,
                Password: hashedPassword,
                Jmeno: firstName,
                Prijmeni: lastName,
                OpravneniID: 2 // Předpokládáme, že 2 je role registrovaného uživatele
            };
            const userId = await this.userModel.addUser(userData);
            req.session.user = { id: userId, username, role: 2 };
            res.redirect('/');
        } catch (error) {
            logger.error(`Error in AuthController.register: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }

    renderLogin(req, res) {
        res.render('login');
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await this.userModel.getUserByUsername(username);
            if (user && await bcrypt.compare(password, user.Password)) {
                req.session.user = { id: user.UzivatelID, username: user.Username, role: user.OpravneniID };
                res.redirect('/');
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            logger.error(`Error in AuthController.login: ${error.message}`);
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = AuthController;
