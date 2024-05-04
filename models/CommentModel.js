class CommentModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro získání všech komentářů podle ID příspěvku
    async getCommentsForPost(postId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Komentar WHERE PrispevekID = ?', [postId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro přidání nového komentáře
    async addComment(commentData) {
        try {
            const query = 'INSERT INTO Komentar (PrispevekID, UzivatelID) VALUES (?, ?)';
            const [result] = await this.pool.query(query, [commentData.postId, commentData.userId]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro aktualizaci existujícího komentáře
    async updateComment(commentId, newData) {
        try {
            const query = 'UPDATE Komentar SET Obsah = ? WHERE KomentarID = ?';
            await this.pool.query(query, [newData.content, commentId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro smazání komentáře
    async deleteComment(commentId) {
        try {
            const query = 'DELETE FROM Komentar WHERE KomentarID = ?';
            await this.pool.query(query, [commentId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci s komentáři...
}

module.exports = CommentModel;
