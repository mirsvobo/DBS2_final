class PrivateMessageModel {
    constructor(db) {
        this.db = db;
    }

    // Odeslání nové soukromé zprávy
    async sendPrivateMessage(messageData) {
        const { content, senderId, receiverId } = messageData;
        const query = `INSERT INTO SoukromaZprava (Obsah, OdesilatelID, PrijemceID) VALUES (?, ?, ?)`;
        const values = [content, senderId, receiverId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId); // Vrátí ID nové soukromé zprávy
            });
        });
    }

    // Získání všech soukromých zpráv pro určitého uživatele
    async getAllPrivateMessagesForUser(userId) {
        const query = `SELECT * FROM SoukromaZprava WHERE PrijemceID = ?`;
        const values = [userId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny soukromé zprávy pro uživatele
            });
        });
    }

    // Získání všech odeslaných soukromých zpráv od určitého uživatele
    async getAllSentPrivateMessagesFromUser(userId) {
        const query = `SELECT * FROM SoukromaZprava WHERE OdesilatelID = ?`;
        const values = [userId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, rows) => {
                if (err) return reject(err);
                resolve(rows); // Vrátí všechny odeslané soukromé zprávy od uživatele
            });
        });
    }

    // Smazání soukromé zprávy podle ID
    async deletePrivateMessage(messageId) {
        const query = `DELETE FROM SoukromaZprava WHERE SoukromazpravaID = ?`;
        const values = [messageId];

        return new Promise((resolve, reject) => {
            this.db.query(query, values, (err, result) => {
                if (err) return reject(err);
                resolve(); // Úspěšné smazání soukromé zprávy
            });
        });
    }

    // Další metody pro manipulaci s soukromými zprávami...

}

module.exports = PrivateMessageModel;
