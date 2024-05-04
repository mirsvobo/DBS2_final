class LikeModel {
    constructor(db) {
        this.db = db;
    }

    // Přidání nového liku
    async addLike(userId, postId) {
        const query = `INSERT INTO LikeTable (UzivatelID, PrispevekID) VALUES (?, ?)`;
        const values = [userId, postId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Vrátí ID nového liku
            });
        });
    }

    // Odebrání liku
    async removeLike(userId, postId) {
        const query = `DELETE FROM LikeTable WHERE UzivatelID = ? AND PrispevekID = ?`;
        const values = [userId, postId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné odebrání liku
            });
        });
    }

    // Získání všech liků uživatele
    async getUserLikes(userId) {
        const query = `SELECT * FROM LikeTable WHERE UzivatelID = ?`;
        const values = [userId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny liky uživatele
            });
        });
    }

    // Získání všech liků příspěvku
    async getPostLikes(postId) {
        const query = `SELECT * FROM LikeTable WHERE PrispevekID = ?`;
        const values = [postId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny liky příspěvku
            });
        });
    }

    // Další metody pro manipulaci s liky...

}

module.exports = LikeModel;
