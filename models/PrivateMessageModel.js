class PrivateMessageModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro odeslání soukromé zprávy
    async sendPrivateMessage(messageData) {
        try {
            const query = 'INSERT INTO SoukromaZprava (Obsah, OdesilatelD, PrijemceID) VALUES (?, ?, ?)';
            const [result] = await this.pool.query(query, [messageData.content, messageData.senderId, messageData.receiverId]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro získání všech soukromých zpráv mezi dvěma uživateli
    async getPrivateMessages(senderId, receiverId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM SoukromaZprava WHERE (OdesilatelD = ? AND PrijemceID = ?) OR (OdesilatelD = ? AND PrijemceID = ?) ORDER BY Cas_odeslani ASC', [senderId, receiverId, receiverId, senderId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci se soukromými zprávami...
}

module.exports = PrivateMessageModel;
