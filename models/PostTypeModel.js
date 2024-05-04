class PostTypeModel {
    constructor(db) {
        this.db = db;
    }

    // Přidání nového typu příspěvku
    async addPostType(postType) {
        const query = `INSERT INTO TypPrispevku (Typ) VALUES (?)`;
        const values = [postType];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Vrátí ID nového typu příspěvku
            });
        });
    }

    // Úprava existujícího typu příspěvku
    async updatePostType(postTypeId, newPostType) {
        const query = `UPDATE TypPrispevku SET Typ = ? WHERE TypprispevkuID = ?`;
        const values = [newPostType, postTypeId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšná aktualizace typu příspěvku
            });
        });
    }

    // Smazání existujícího typu příspěvku
    async deletePostType(postTypeId) {
        const query = `DELETE FROM TypPrispevku WHERE TypprispevkuID = ?`;
        const values = [postTypeId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání typu příspěvku
            });
        });
    }

    // Získání všech typů příspěvků
    async getAllPostTypes() {
        const query = `SELECT * FROM TypPrispevku`;

        return new Promise((resolve, reject) => {
            this.db.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny typy příspěvků
            });
        });
    }

    // Získání typu příspěvku podle ID
    async getPostTypeById(postTypeId) {
        const query = `SELECT * FROM TypPrispevku WHERE TypprispevkuID = ?`;
        const values = [postTypeId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows[0] || null); // Vrátí první nalezený typ příspěvku nebo null, pokud není nalezen žádný
            });
        });
    }

    // Další metody pro manipulaci s typy příspěvků...

}

module.exports = PostTypeModel;
