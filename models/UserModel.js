const pool = require('../db');
const logger = require('../logger');

class UserModel {
    async addUser(userData) {
        try {
            const query = 'INSERT INTO Uzivatel (Jmeno, Prijmeni, Username, Email, Password, OpravneniID) VALUES (?, ?, ?, ?, ?, ?)';
            const [result] = await pool.query(query, [userData.Jmeno, userData.Prijmeni, userData.Username, userData.Email, userData.Password, userData.OpravneniID]);
            return result.insertId;
        } catch (error) {
            logger.error(`Error in UserModel.addUser: ${error.message}`);
            throw error;
        }
    }

    async getUserByUsername(username) {
        try {
            const [rows] = await pool.query('SELECT * FROM Uzivatel WHERE Username = ?', [username]);
            return rows[0] || null;
        } catch (error) {
            logger.error(`Error in UserModel.getUserByUsername: ${error.message}`);
            throw error;
        }
    }

async getUserById(userId) {
        try {
            const [rows] = await pool.query('SELECT * FROM Uzivatel WHERE UzivatelID = ?', [userId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const [rows] = await pool.query('SELECT * FROM Uzivatel');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(userId, newData) {
        try {
            const query = 'UPDATE Uzivatel SET Jmeno = ?, Prijmeni = ?, Username = ?, Email = ? WHERE UzivatelID = ?';
            await pool.query(query, [newData.firstName, newData.lastName, newData.username, newData.email, userId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            const query = 'DELETE FROM Uzivatel WHERE UzivatelID = ?';
            await pool.query(query, [userId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserModel;
