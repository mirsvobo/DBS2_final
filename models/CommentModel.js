class CommentModel {
    constructor(db) {
        this.db = db;
    }

    // Přidání nového komentáře
    async addComment(prispevekId, uzivatelId) {
        const query = `INSERT INTO Komentar (PrispevekID, UzivatelID) VALUES (?, ?)`;
        const values = [prispevekId, uzivatelId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Vrátí ID nového komentáře
            });
        });
    }

    // Úprava existujícího komentáře
    async updateComment(commentId, newPrispevekId, newUzivatelId) {
        const query = `UPDATE Komentar SET PrispevekID = ?, UzivatelID = ? WHERE KomentarID = ?`;
        const values = [newPrispevekId, newUzivatelId, commentId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšná aktualizace komentáře
            });
        });
    }

    // Smazání existujícího komentáře
    async deleteComment(commentId) {
        const query = `DELETE FROM Komentar WHERE KomentarID = ?`;
        const values = [commentId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání komentáře
            });
        });
    }

    // Získání komentáře podle ID
    async getCommentById(commentId) {
        const query = `SELECT * FROM Komentar WHERE KomentarID = ?`;
        const values = [commentId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows[0] || null); // Vrátí první nalezený komentář nebo null, pokud není nalezen žádný
            });
        });
    }

    // Získání všech komentářů podle ID příspěvku
    async getCommentsByPostId(prispevekId) {
        const query = `SELECT * FROM Komentar WHERE PrispevekID = ?`;
        const values = [prispevekId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny nalezené komentáře
            });
        });
    }

    // Další metody pro získávání nebo manipulaci s komentáři...

}

module.exports = CommentModel;
