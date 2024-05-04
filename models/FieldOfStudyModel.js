class FieldOfStudyModel {
    constructor(db) {
        this.db = db;
    }

    // Přidání nového oboru studia
    async addFieldOfStudy(fieldOfStudyName) {
        const query = `INSERT INTO Obor (Nazev_oboru) VALUES (?)`;
        const values = [fieldOfStudyName];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Vrátí ID nového oboru studia
            });
        });
    }

    // Úprava existujícího oboru studia
    async updateFieldOfStudy(fieldOfStudyId, newFieldOfStudyName) {
        const query = `UPDATE Obor SET Nazev_oboru = ? WHERE OborID = ?`;
        const values = [newFieldOfStudyName, fieldOfStudyId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšná aktualizace oboru studia
            });
        });
    }

    // Smazání existujícího oboru studia
    async deleteFieldOfStudy(fieldOfStudyId) {
        const query = `DELETE FROM Obor WHERE OborID = ?`;
        const values = [fieldOfStudyId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání oboru studia
            });
        });
    }

    // Získání všech oborů studia
    async getAllFieldsOfStudy() {
        const query = `SELECT * FROM Obor`;

        return new Promise((resolve, reject) => {
            this.db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny obory studia
            });
        });
    }

    // Získání oboru studia podle ID
    async getFieldOfStudyById(fieldOfStudyId) {
        const query = `SELECT * FROM Obor WHERE OborID = ?`;
        const values = [fieldOfStudyId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows[0] || null); // Vrátí první nalezený obor studia nebo null, pokud není nalezen žádný
            });
        });
    }

    // Další metody pro manipulaci s obory studia...

}

module.exports = FieldOfStudyModel;
