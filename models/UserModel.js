const bcrypt = require('bcrypt');

class UserModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro registraci nového uživatele
    async registerUser(userData) {
        try {
            const hashedPassword = await bcrypt.hash(userData.password, 10); // Hashování hesla
            const query = 'INSERT INTO Uzivatel (Jmeno, Prijmeni, Username, Password, OpravneniID) VALUES (?, ?, ?, ?, ?)';
            const [result] = await this.pool.query(query, [userData.firstName, userData.lastName, userData.username, hashedPassword, userData.permissionId]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro autentizaci uživatele při přihlašování
    async authenticateUser(username, password) {
        try {
            const [rows, fields] = await this.pool.query('SELECT UzivatelID, Password FROM Uzivatel WHERE Username = ?', [username]);
            if (rows.length === 0) {
                return null; // Uživatel neexistuje
            }
            const user = rows[0];
            const passwordMatch = await bcrypt.compare(password, user.Password); // Porovnání hesel
            if (passwordMatch) {
                return user.UzivatelID; // Vrací ID uživatele, pokud hesla odpovídají
            } else {
                return null; // Hesla se neshodují
            }
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

    // Další metody modelu pro manipulaci s uživateli...
}

module.exports = UserModel;
