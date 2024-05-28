const pool = require('../db');

class CommentModel {
    constructor(pool) {
        this.pool = pool;
    }

    async getCommentsByPostId(postId) {
        const [rows] = await this.pool.query('SELECT k.*, u.Jmeno, u.Prijmeni FROM Komentar k JOIN Uzivatel u ON k.UzivatelID = u.UzivatelID WHERE k.PrispevekID = ?', [postId]);
        return rows;
    }

    async createComment(commentData) {
        const { Obsah_komentare, UzivatelID, PrispevekID } = commentData;
        const [result] = await this.pool.query('INSERT INTO Komentar (Obsah_komentare, UzivatelID, PrispevekID, Cas_odeslani) VALUES (?, ?, ?, NOW())', [Obsah_komentare, UzivatelID, PrispevekID]);
        return result.insertId;
    }

    async getCommentById(commentId) {
        const [rows] = await this.pool.query('SELECT k.*, u.Jmeno, u.Prijmeni FROM Komentar k JOIN Uzivatel u ON k.UzivatelID = u.UzivatelID WHERE k.KomentarID = ?', [commentId]);
        return rows[0];
    }

    async updateComment(commentId, commentData) {
        const { Obsah_komentare } = commentData;
        await this.pool.query('UPDATE Komentar SET Obsah_komentare = ? WHERE KomentarID = ?', [Obsah_komentare, commentId]);
    }

    async deleteComment(commentId) {
        await this.pool.query('DELETE FROM Komentar WHERE KomentarID = ?', [commentId]);
    }
}

module.exports = CommentModel;
