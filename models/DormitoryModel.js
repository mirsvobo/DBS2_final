class DormitoryModel {
    constructor(db) {
        this.db = db;
    }

    // Přidání nového záznamu o koleji
    async addDormitory(address, name) {
        const query = `INSERT INTO Kolej (Adresa, Nazev) VALUES (POINT(?), ?)`;
        const values = [address, name];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Vrátí ID nového záznamu o kolej
            });
        });
    }

    // Úprava existujícího záznamu o koleji
    async updateDormitory(dormitoryId, newAddress, newName) {
        const query = `UPDATE Kolej SET Adresa = POINT(?), Nazev = ? WHERE KolejID = ?`;
        const values = [newAddress, newName, dormitoryId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšná aktualizace záznamu o kolej
            });
        });
    }

    // Smazání existujícího záznamu o koleji
    async deleteDormitory(dormitoryId) {
        const query = `DELETE FROM Kolej WHERE KolejID = ?`;
        const values = [dormitoryId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání záznamu o kolej
            });
        });
    }

    // Získání všech záznamů o kolejích
    async getAllDormitories() {
        const query = `SELECT * FROM Kolej`;

        return new Promise((resolve, reject) => {
            this.db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny záznamy o kolejích
            });
        });
    }

    // Získání záznamu o kolej podle ID
    async getDormitoryById(dormitoryId) {
        const query = `SELECT * FROM Kolej WHERE KolejID = ?`;
        const values = [dormitoryId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows[0] || null); // Vrátí první nalezený záznam o kolej nebo null, pokud není nalezen žádný
            });
        });
    }

    // Další metody pro manipulaci s kolejemi...

}

module.exports = DormitoryModel;
