const bcrypt = require('bcrypt');

class UserModel {
    constructor(db) {
        this.db = db;
    }

    async addUser(username, password, jmeno, prijmeni, kolejID, oborID, opravneniID, univerzitaID) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hashování hesla

        const query = `INSERT INTO Uzivatel (Username, Password, Jmeno, Prijmeni, KolejID, OborID, OpravneniID, UniverzitaID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [username, hashedPassword, jmeno, prijmeni, kolejID, oborID, opravneniID, univerzitaID];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            });
        });
    }

    async getUserById(userId) {
        const query = `SELECT * FROM Uzivatel WHERE UzivatelID = ?`;
        const values = [userId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows[0]); // Vrátí uživatele nebo null, pokud není nalezen
            });
        });
    }

    async updateUserPassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hashování nového hesla

        const query = `UPDATE Uzivatel SET Password = ? WHERE UzivatelID = ?`;
        const values = [hashedPassword, userId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšná aktualizace hesla
            });
        });
    }

    async deleteUser(userId) {
        const query = `DELETE FROM Uzivatel WHERE UzivatelID = ?`;
        const values = [userId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání uživatele
            });
        });
    }

    async validateLogin(username, password) {
        const query = `SELECT * FROM Uzivatel WHERE Username = ?`;
        const values = [username];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, async (err, rows) => {
                if (err) return reject(err);
                if (rows.length === 0) return resolve(null); // Uživatel nenalezen

                const user = rows[0];
                const passwordMatch = await bcrypt.compare(password, user.Password); // Porovnání hashů hesel

                if (passwordMatch) {
                    resolve(user); // Přihlašovací údaje jsou platné
                } else {
                    resolve(null); // Neplatné přihlašovací údaje
                }
            });
        });
    }

}

module.exports = UserModel;
