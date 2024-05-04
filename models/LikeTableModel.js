class LikeTableModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro přidání liku k příspěvku
    async addLikeToPost(userId, postId) {
        try {
            const query = 'INSERT INTO LikeTable (UzivatelID, PrispevekID) VALUES (?, ?)';
            const [result] = await this.pool.query(query, [userId, postId]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro odebrání liku od příspěvku
    async removeLikeFromPost(userId, postId) {
        try {
            const query = 'DELETE FROM LikeTable WHERE UzivatelID = ? AND PrispevekID = ?';
            await this.pool.query(query, [userId, postId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro zjištění, zda uživatel dal like k příspěvku
    async hasUserLikedPost(userId, postId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM LikeTable WHERE UzivatelID = ? AND PrispevekID = ?', [userId, postId]);
            return rows.length > 0;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci s tabulkou LikeTable...
}

module.exports = LikeTableModel;
