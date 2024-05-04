class PermissionModel {
    constructor(db) {
        this.db = db;
    }

    // Přidání nového oprávnění
    async addPermission(moderator, allowReport, allowComment, allowPost, allowMessage) {
        const query = `INSERT INTO Opravneni (Moderator, Povoleni_hlaseni, Povoleni_komentare, Povoleni_prispevky, Povoleni_zpravy) VALUES (?, ?, ?, ?, ?)`;
        const values = [moderator, allowReport, allowComment, allowPost, allowMessage];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Vrátí ID nového oprávnění
            });
        });
    }

    // Úprava existujícího oprávnění
    async updatePermission(permissionId, newModerator, newAllowReport, newAllowComment, newAllowPost, newAllowMessage) {
        const query = `UPDATE Opravneni SET Moderator = ?, Povoleni_hlaseni = ?, Povoleni_komentare = ?, Povoleni_prispevky = ?, Povoleni_zpravy = ? WHERE OpravneniID = ?`;
        const values = [newModerator, newAllowReport, newAllowComment, newAllowPost, newAllowMessage, permissionId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšná aktualizace oprávnění
            });
        });
    }

    // Smazání existujícího oprávnění
    async deletePermission(permissionId) {
        const query = `DELETE FROM Opravneni WHERE OpravneniID = ?`;
        const values = [permissionId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání oprávnění
            });
        });
    }

    // Získání všech oprávnění
    async getAllPermissions() {
        const query = `SELECT * FROM Opravneni`;

        return new Promise((resolve, reject) => {
            this.db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechna oprávnění
            });
        });
    }

    // Získání oprávnění podle ID
    async getPermissionById(permissionId) {
        const query = `SELECT * FROM Opravneni WHERE OpravneniID = ?`;
        const values = [permissionId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows[0] || null); // Vrátí první nalezené oprávnění nebo null, pokud není nalezeno žádné
            });
        });
    }

    // Další metody pro manipulaci s oprávněními...

}

module.exports = PermissionModel;
