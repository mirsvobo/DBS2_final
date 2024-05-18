class PostTypeModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addPostType(postTypeData) {
        try {
            const query = 'INSERT INTO TypPrispevku (Typ) VALUES (?)';
            const [result] = await this.pool.query(query, [postTypeData.Typ]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getPostTypeById(postTypeId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM TypPrispevku WHERE TypprispevkuID = ?', [postTypeId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getAllPostTypes() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM TypPrispevku');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async updatePostType(postTypeId, newData) {
        try {
            const query = 'UPDATE TypPrispevku SET Typ = ? WHERE TypprispevkuID = ?';
            await this.pool.query(query, [newData.Typ, postTypeId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deletePostType(postTypeId) {
        try {
            const query = 'DELETE FROM TypPrispevku WHERE TypprispevkuID = ?';
            await this.pool.query(query, [postTypeId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PostTypeModel;
