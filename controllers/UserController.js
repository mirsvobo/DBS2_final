class UserController {
    async addUser(req, res) {
        try {
            const userData = req.body;
            const userId = await req.userModel.addUser(userData);
            res.status(201).json({ message: 'Uživatel byl vytvořen', userId });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await req.userModel.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const userId = req.params.id;
            const user = await req.userModel.getUserById(userId);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'Uživatel nenalezen' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserByUsername(req, res) {
        try {
            const username = req.params.username;
            const user = await req.userModel.getUserByUsername(username);
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
        try {
            const userId = req.params.id;
            const newData = req.body;
            await req.userModel.updateUser(userId, newData);
            res.json({ message: 'Uživatel byl aktualizován' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            await req.userModel.deleteUser(userId);
            res.json({ message: 'Uživatel byl odstraněn' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = UserController;
