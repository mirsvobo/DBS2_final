const bcrypt = require('bcrypt');

class UserModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addUser(userData) {
        try {
            // Hash hesla
            const hashedPassword = await bcrypt.hash(userData.Password, 10);

            const query = 'INSERT INTO Uzivatel (Jmeno, Prijmeni, Username, Password, OpravneniID) VALUES (?, ?, ?, ?, ?)';
            const [result] = await this.pool.query(query, [userData.Jmeno, userData.Prijmeni, userData.Username, hashedPassword, userData.OpravneniID]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }


    // Metoda pro získání uživatele podle ID
    async getUserById(userId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Uzivatel WHERE UzivatelID = ?', [userId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro získání všech uživatelů
    async getAllUsers() {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Uzivatel');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro aktualizaci informací o uživateli
    async updateUser(userId, newData) {
        try {
            const query = 'UPDATE Uzivatel SET Jmeno = ?, Prijmeni = ?, Username = ? WHERE UzivatelID = ?';
            await this.pool.query(query, [newData.firstName, newData.lastName, newData.username, userId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro smazání uživatele
    async deleteUser(userId) {
        try {
            const query = 'DELETE FROM Uzivatel WHERE UzivatelID = ?';
            await this.pool.query(query, [userId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getUserByUsername(username) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Uzivatel WHERE Username = ?', [username]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;
