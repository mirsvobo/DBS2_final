const pool = require('../db');

class CommentModel {
    constructor(pool) {
        this.pool = pool;
    }

    async getCommentsByPostId(postId) {
        const [rows] = await this.pool.query('SELECT * FROM Komentar WHERE PrispevekID = ?', [postId]);
        return rows;
    }

    async createComment(commentData) {
        const { Obsah_komentare, PrispevekID, UzivatelID } = commentData;
        const [result] = await this.pool.query('INSERT INTO Komentar (Obsah_komentare, PrispevekID, UzivatelID, Cas_odeslani) VALUES (?, ?, ?, NOW())', [Obsah_komentare, PrispevekID, UzivatelID]);
        return result.insertId;
    }

    async updateComment(commentId, commentData) {
        const { Obsah_komentare } = commentData;
        await this.pool.query('UPDATE Komentar SET Obsah_komentare = ? WHERE KomentarID = ?', [Obsah_komentare, commentId]);
    }

    async deleteComment(commentId) {
        await this.pool.query('DELETE FROM Komentar WHERE KomentarID = ?', [commentId]);
    }

    async deleteCommentsByPostId(postId) { // Přidáno
        await this.pool.query('DELETE FROM Komentar WHERE PrispevekID = ?', [postId]);
    }
}

module.exports = CommentModel;
