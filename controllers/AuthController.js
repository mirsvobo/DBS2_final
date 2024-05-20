const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');
const pool = require('../db');

class AuthController {
    constructor() {
        this.userModel = new UserModel(pool);
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
                OpravneniID: 2
            };
            await this.userModel.addUser(userData);
            res.redirect('/');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        const { username, password } = req.body;
        try {
            const user = await this.userModel.getUserByUsername(username);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.Password);
            console.log('Porovnání hesel:', isMatch);
            console.log('Zadané heslo:', password);
            console.log('Hashované heslo z databáze:', user.Password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            req.session.user = user;
            res.redirect('/');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to log out' });
            }
            res.redirect('/auth/login');
        });
    }
}

module.exports = AuthController;
