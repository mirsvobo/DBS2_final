const UserModel = require('../models/UserModel');

class UserController {
    constructor() {
        this.userModel = new UserModel();
    }

    async addUser(req, res) {
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
            const userId = await this.userModel.addUser(userData);
            req.session.user = { id: userId, username, role: 2 };
            res.redirect('/');
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await this.userModel.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const user = await this.userModel.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Uživatel nenalezen' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        const newData = req.body;
        try {
            await this.userModel.updateUser(userId, newData);
            res.json({ message: 'Uživatel byl aktualizován' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            await this.userModel.deleteUser(userId);
            res.json({ message: 'Uživatel byl odstraněn' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;
