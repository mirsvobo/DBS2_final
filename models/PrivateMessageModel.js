class PrivateMessagesModel {
    constructor(pool) {
        this.pool = pool;
    }

    async sendMessage(messageData) {
        try {
            const query = 'INSERT INTO SoukromaZprava (Obsah, OdesilatelD, PrijemceID) VALUES (?, ?, ?)';
            const [result] = await this.pool.query(query, [messageData.Obsah, messageData.OdesilatelID, messageData.PrijemceID]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getMessageById(messageId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM SoukromaZprava WHERE SoukromazpravaID = ?', [messageId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getMessagesByUserId(userId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM SoukromaZprava WHERE OdesilatelD = ? OR PrijemceID = ?', [userId, userId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async deleteMessage(messageId) {
        try {
            const query = 'DELETE FROM SoukromaZprava WHERE SoukromazpravaID = ?';
            await this.pool.query(query, [messageId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PrivateMessagesModel;
