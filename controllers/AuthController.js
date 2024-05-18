const UserModel = require('../models/UserModel');
const { generateToken } = require('../utils/auth');
const bcrypt = require('bcrypt');
const pool = require('../app.js');
const userModel = new UserModel(pool);

class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await userModel.getUserByUsername(username);
            if (!user) {
                return res.status(401).json({ message: 'Špatné přihlašovací údaje.' });
            }

            const passwordMatch = await bcrypt.compare(password, user.Password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Špatné přihlašovací údaje.' });
            }

            const token = generateToken(user);
            res.json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async register(req, res) {
        const { Jmeno, Prijmeni, Username, Password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(Password, 10);
            const userData = { Jmeno, Prijmeni, Username, Password: hashedPassword, OpravneniID: 2 }; // OpravneniID: 2 = registrovaný uživatel
            const userId = await userModel.addUser(userData);

            const user = await userModel.getUserById(userId);
            const token = generateToken(user);

            res.status(201).json({ token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = AuthController;
