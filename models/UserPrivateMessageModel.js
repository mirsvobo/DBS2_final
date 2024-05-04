class UserPrivateMessageModel {
    constructor(db) {
        this.db = db;
    }

    // Přiřazení soukromé zprávy k uživateli
    async assignPrivateMessageToUser(messageId, userId) {
        const query = `INSERT INTO UzivatelSoukromaZprava (SoukromazpravaID, UzivatelID) VALUES (?, ?)`;
        const values = [messageId, userId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné přiřazení soukromé zprávy k uživateli
            });
        });
    }

    // Získání všech soukromých zpráv přiřazených k uživateli
    async getPrivateMessagesForUser(userId) {
        const query = `SELECT * FROM UzivatelSoukromaZprava WHERE UzivatelID = ?`;
        const values = [userId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny soukromé zprávy přiřazené k uživateli
            });
        });
    }

    // Smazání všech přiřazených soukromých zpráv k uživateli
    async deletePrivateMessagesForUser(userId) {
        const query = `DELETE FROM UzivatelSoukromaZprava WHERE UzivatelID = ?`;
        const values = [userId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání všech přiřazených soukromých zpráv k uživateli
            });
        });
    }

    // Další metody pro manipulaci s přiřazením soukromých zpráv k uživatelům...

}

module.exports = UserPrivateMessageModel;
