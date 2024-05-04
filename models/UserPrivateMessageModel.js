class UserPrivateMessageModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro uložení soukromé zprávy vazby mezi uživatelem a soukromou zprávou
    async addUserPrivateMessage(userId, messageId) {
        try {
            const query = 'INSERT INTO UzivatelSoukromaZprava (SoukromazpravaID, UzivatelID) VALUES (?, ?)';
            const [result] = await this.pool.query(query, [messageId, userId]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro získání všech soukromých zpráv daného uživatele
    async getUserPrivateMessages(userId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM SoukromaZprava WHERE SoukromazpravaID IN (SELECT SoukromazpravaID FROM UzivatelSoukromaZprava WHERE UzivatelID = ?)', [userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci s uživatelskými soukromými zprávami...
}

module.exports = UserPrivateMessageModel;
