class PostModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addPost(postData) {
        try {
            const query = 'INSERT INTO Prispevek (Cas_odeslani, Obsah_prispevku, UzivatelID) VALUES (?, ?, ?)';
            const [result] = await this.pool.query(query, [postData.Cas_odeslani, postData.Obsah_prispevku, postData.UzivatelID]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getPostById(postId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Prispevek WHERE PrispevekID = ?', [postId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getAllPosts() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Prispevek');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async updatePost(postId, newData) {
        try {
            const query = 'UPDATE Prispevek SET Cas_odeslani = ?, Obsah_prispevku = ?, UzivatelID = ? WHERE PrispevekID = ?';
            await this.pool.query(query, [newData.Cas_odeslani, newData.Obsah_prispevku, newData.UzivatelID, postId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deletePost(postId) {
        try {
            const query = 'DELETE FROM Prispevek WHERE PrispevekID = ?';
            await this.pool.query(query, [postId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PostModel;
