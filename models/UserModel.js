const pool = require('../db');

class UserModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addUser(userData) {
        const [result] = await this.pool.query('INSERT INTO Uzivatel SET ?', [userData]);
        return result.insertId;
    }

    async getAllUsers() {
        const [rows] = await this.pool.query('SELECT * FROM Uzivatel');
        return rows;
    }

    async getUserById(userId) {
        const [rows] = await this.pool.query('SELECT * FROM Uzivatel WHERE UzivatelID = ?', [userId]);
        return rows[0];
    }

    async updateUser(userId, userData) {
        await this.pool.query('UPDATE Uzivatel SET ? WHERE UzivatelID = ?', [userData, userId]);
    }

    async deleteUser(userId) {
        await this.pool.query('DELETE FROM Uzivatel WHERE UzivatelID = ?', [userId]);
    }

    async getUserByUsername(username) {
        const [rows] = await this.pool.query('SELECT * FROM Uzivatel WHERE Username = ?', [username]);
        return rows[0];
    }

    async getUserPosts(userId) {
        const [rows] = await this.pool.query('SELECT * FROM Prispevek WHERE UzivatelID = ?', [userId]);
        return rows;
    }
}

module.exports = UserModel;
