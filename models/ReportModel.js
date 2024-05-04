class ReportModel {
    constructor(db) {
        this.db = db;
    }

    // Přidání nového hlášení
    async addReport(reportContent, commentId, userId) {
        const query = `INSERT INTO Hlaseni (Cas_hlaseni, Obsah_hlaseni, KomentarID, UzivatelID) VALUES (NOW(), ?, ?, ?)`;
        const values = [reportContent, commentId, userId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Vrátí ID nového hlášení
            });
        });
    }

    // Úprava existujícího hlášení
    async updateReport(reportId, newReportContent) {
        const query = `UPDATE Hlaseni SET Obsah_hlaseni = ? WHERE HlaseniID = ?`;
        const values = [newReportContent, reportId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšná aktualizace hlášení
            });
        });
    }

    // Smazání existujícího hlášení
    async deleteReport(reportId) {
        const query = `DELETE FROM Hlaseni WHERE HlaseniID = ?`;
        const values = [reportId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání hlášení
            });
        });
    }

    // Získání všech hlášení
    async getAllReports() {
        const query = `SELECT * FROM Hlaseni`;

        return new Promise((resolve, reject) => {
            this.db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechna hlášení
            });
        });
    }

    // Získání hlášení podle ID
    async getReportById(reportId) {
        const query = `SELECT * FROM Hlaseni WHERE HlaseniID = ?`;
        const values = [reportId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows[0] || null); // Vrátí první nalezené hlášení nebo null, pokud není nalezeno žádné
            });
        });
    }

    // Další metody pro manipulaci s hlášeními...

}

module.exports = ReportModel;
