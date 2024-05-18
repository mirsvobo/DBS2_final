class PostPostTypeModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addPostPostType(postPostTypeData) {
        try {
            const query = 'INSERT INTO PrispevekTypPrispevku (TypprispevkuID, PrispevekID) VALUES (?, ?)';
            const [result] = await this.pool.query(query, [postPostTypeData.TypPrispevkuID, postPostTypeData.PrispevekID]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getPostTypesByPostId(postId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM PrispevekTypPrispevku WHERE PrispevekID = ?', [postId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async deletePostPostType(postPostTypeId) {
        try {
            const query = 'DELETE FROM PrispevekTypPrispevku WHERE TypprispevkuID = ? AND PrispevekID = ?';
            await this.pool.query(query, [postPostTypeId.TypPrispevkuID, postPostTypeId.PrispevekID]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PostPostTypeModel;
