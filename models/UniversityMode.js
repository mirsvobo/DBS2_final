class UniversityModel {
    constructor(db) {
        this.db = db;
    }

    // Přidání nové univerzity
    async addUniversity(universityData) {
        const { address, name } = universityData;
        const query = `INSERT INTO Univerzita (Adresa, Nazev) VALUES (?, ?)`;
        const values = [address, name];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Vrátí ID nové univerzity
            });
        });
    }

    // Úprava existující univerzity
    async updateUniversity(universityId, newName, newAddress) {
        const query = `UPDATE Univerzita SET Nazev = ?, Adresa = ? WHERE UniverzitaID = ?`;
        const values = [newName, newAddress, universityId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšná aktualizace univerzity
            });
        });
    }

    // Smazání existující univerzity
    async deleteUniversity(universityId) {
        const query = `DELETE FROM Univerzita WHERE UniverzitaID = ?`;
        const values = [universityId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání univerzity
            });
        });
    }

    // Získání všech univerzit
    async getAllUniversities() {
        const query = `SELECT * FROM Univerzita`;

        return new Promise((resolve, reject) => {
            this.db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny univerzity
            });
        });
    }

    // Získání univerzity podle ID
    async getUniversityById(universityId) {
        const query = `SELECT * FROM Univerzita WHERE UniverzitaID = ?`;
        const values = [universityId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows[0] || null); // Vrátí první nalezenou univerzitu nebo null, pokud není nalezena žádná
            });
        });
    }

    // Další metody pro manipulaci s univerzitami...

}

module.exports = UniversityModel;
