class UserPrivateMessageModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addUserPrivateMessage(userPrivateMessageData) {
        try {
            const query = 'INSERT INTO UzivatelSoukromaZprava (SoukromazpravaID, UzivatelID) VALUES (?, ?)';
            const [result] = await this.pool.query(query, [userPrivateMessageData.SoukromazpravaID, userPrivateMessageData.UzivatelID]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getUserPrivateMessagesByUserId(userId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM UzivatelSoukromaZprava WHERE UzivatelID = ?', [userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async deleteUserPrivateMessage(userPrivateMessageId) {
        try {
            const query = 'DELETE FROM UzivatelSoukromaZprava WHERE SoukromazpravaID = ? AND UzivatelID = ?';
            await this.pool.query(query, [userPrivateMessageId.SoukromazpravaID, userPrivateMessageId.UzivatelID]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserPrivateMessageModel;
