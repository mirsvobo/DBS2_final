class PostPostTypeModel {
    constructor(db) {
        this.db = db;
    }

    // Přidání nového přiřazení příspěvku k typu příspěvku
    async addPostToPostType(postId, postTypeId) {
        const query = `INSERT INTO PrispevekTypPrispevku (PrispevekID, TypprispevkuID) VALUES (?, ?)`;
        const values = [postId, postTypeId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné přiřazení příspěvku k typu příspěvku
            });
        });
    }

    // Úprava existujícího přiřazení příspěvku k typu příspěvku
    async updatePostToPostType(postId, newPostTypeId) {
        const query = `UPDATE PrispevekTypPrispevku SET TypprispevkuID = ? WHERE PrispevekID = ?`;
        const values = [newPostTypeId, postId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšná aktualizace přiřazení příspěvku k typu příspěvku
            });
        });
    }

    // Smazání existujícího přiřazení příspěvku k typu příspěvku
    async deletePostToPostType(postId) {
        const query = `DELETE FROM PrispevekTypPrispevku WHERE PrispevekID = ?`;
        const values = [postId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání přiřazení příspěvku k typu příspěvku
            });
        });
    }

    // Získání typu příspěvku podle ID příspěvku
    async getPostTypeByPostId(postId) {
        const query = `SELECT TypprispevkuID FROM PrispevekTypPrispevku WHERE PrispevekID = ?`;
        const values = [postId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows[0] ? rows[0].TypprispevkuID : null); // Vrátí ID typu příspěvku nebo null, pokud není nalezen žádný záznam
            });
        });
    }

    // Další metody pro manipulaci s přiřazením příspěvků k typům příspěvků...

}

module.exports = PostPostTypeModel;
