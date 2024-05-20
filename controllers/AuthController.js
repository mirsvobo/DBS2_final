const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const pool = require('../db');

const userModel = new UserModel(pool);

class AuthController {
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
            await userModel.addUser(userData);
            res.redirect('/');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await userModel.getUserByUsername(username);
            if (user && await bcrypt.compare(password, user.Password)) {
                req.session.user = user;
                res.redirect('/');
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).json({ message: 'Odhlášení se nezdařilo.' });
            }
            res.redirect('/');
        });
    }
}

module.exports = AuthController;
