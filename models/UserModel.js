const bcrypt = require('bcrypt');

class UserModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Přidání nového uživatele
    async addUser(userData) {
        try {
            const { Username, Email, Password, Jmeno, Prijmeni, OpravneniID } = userData;
            const query = 'INSERT INTO Uzivatel (Username, Email, Password, Jmeno, Prijmeni, OpravneniID) VALUES (?, ?, ?, ?, ?, ?)';
            const [result] = await this.pool.query(query, [Username, Email, Password, Jmeno, Prijmeni, OpravneniID]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Získání uživatele podle uživatelského jména
    async getUserByUsername(username) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Uzivatel WHERE Username = ?', [username]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Získání uživatele podle ID
    async getUserById(userId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Uzivatel WHERE UzivatelID = ?', [userId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Aktualizace uživatele
    async updateUser(userId, newData) {
        try {
            const { Username, Email, Password, Jmeno, Prijmeni, OpravneniID } = newData;
            const query = 'UPDATE Uzivatel SET Username = ?, Email = ?, Password = ?, Jmeno = ?, Prijmeni = ?, OpravneniID = ? WHERE UzivatelID = ?';
            await this.pool.query(query, [Username, Email, Password, Jmeno, Prijmeni, OpravneniID, userId]);
        } catch (error) {
            throw error;
        }
    }

    // Smazání uživatele
    async deleteUser(userId) {
        try {
            const query = 'DELETE FROM Uzivatel WHERE UzivatelID = ?';
            await this.pool.query(query, [userId]);
        } catch (error) {
            throw error;
        }
    }

    // Ověření uživatele
    async authenticateUser(username, password) {
        try {
            const user = await this.getUserByUsername(username);
            if (!user) {
                return null;
            }

            const isMatch = await bcrypt.compare(password, user.Password);
            return isMatch ? user : null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;
