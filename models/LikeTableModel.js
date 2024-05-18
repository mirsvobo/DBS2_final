class LikeTableModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addLike(likeData) {
        try {
            const query = 'INSERT INTO LikeTable (UzivatelID, PrispevekID) VALUES (?, ?)';
            const [result] = await this.pool.query(query, [likeData.UzivatelID, likeData.PrispevekID]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getLikesByPostId(postId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM LikeTable WHERE PrispevekID = ?', [postId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async deleteLike(likeId) {
        try {
            const query = 'DELETE FROM LikeTable WHERE LikeID = ?';
            await this.pool.query(query, [likeId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = LikeTableModel;
