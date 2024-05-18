class CommentModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addComment(commentData) {
        try {
            const query = 'INSERT INTO Komentar (PrispevekID, UzivatelID, Obsah) VALUES (?, ?, ?)';
            const [result] = await this.pool.query(query, [commentData.PrispevekID, commentData.UzivatelID, commentData.Obsah_komentare]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getCommentById(commentId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Komentar WHERE KomentarID = ?', [commentId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getCommentsByPostId(postId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Komentar WHERE PrispevekID = ?', [postId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getAllComments() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Komentar');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async updateComment(commentId, newData) {
        try {
            const query = 'UPDATE Komentar SET PrispevekID = ?, UzivatelID = ?, Obsah = ? WHERE KomentarID = ?';
            await this.pool.query(query, [newData.PrispevekID, newData.UzivatelID, newData.Obsah_komentare, commentId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteComment(commentId) {
        try {
            const query = 'DELETE FROM Komentar WHERE KomentarID = ?';
            await this.pool.query(query, [commentId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CommentModel;
