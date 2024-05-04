class PostModel {
    constructor(db) {
        this.db = db;
    }

    // Přidání nového příspěvku
    async addPost(postData) {
        const { timestamp, content, userId, postType } = postData;
        const query = `INSERT INTO Prispevek (Cas_odeslani, Obsah_prispevku, UzivatelID, Typ_prispevku) VALUES (?, ?, ?, ?)`;
        const values = [timestamp, content, userId, postType];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Vrátí ID nového příspěvku
            });
        });
    }

    // Úprava existujícího příspěvku
    async updatePost(postId, newContent) {
        const query = `UPDATE Prispevek SET Obsah_prispevku = ? WHERE PrispevekID = ?`;
        const values = [newContent, postId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšná aktualizace příspěvku
            });
        });
    }

    // Smazání existujícího příspěvku
    async deletePost(postId) {
        const query = `DELETE FROM Prispevek WHERE PrispevekID = ?`;
        const values = [postId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání příspěvku
            });
        });
    }

    // Získání všech příspěvků
    async getAllPosts() {
        const query = `SELECT * FROM Prispevek`;

        return new Promise((resolve, reject) => {
            this.db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny příspěvky
            });
        });
    }

    // Získání příspěvku podle ID
    async getPostById(postId) {
        const query = `SELECT * FROM Prispevek WHERE PrispevekID = ?`;
        const values = [postId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows[0] || null); // Vrátí první nalezený příspěvek nebo null, pokud není nalezen žádný
            });
        });
    }

    // Další metody pro manipulaci s příspěvky...

}

module.exports = PostModel;
