class PostModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro získání všech příspěvků
    async getAllPosts() {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Prispevek');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro získání příspěvku podle ID
    async getPostById(postId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Prispevek WHERE PrispevekID = ?', [postId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro přidání nového příspěvku
    async addPost(postData) {
        try {
            const query = 'INSERT INTO Prispevek (Cas_odeslani, Obsah_prispevku, UzivatelID) VALUES (?, ?, ?)';
            const [result] = await this.pool.query(query, [postData.timestamp, postData.content, postData.userId]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro aktualizaci příspěvku
    async updatePost(postId, newData) {
        try {
            const query = 'UPDATE Prispevek SET Obsah_prispevku = ? WHERE PrispevekID = ?';
            await this.pool.query(query, [newData.content, postId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro smazání příspěvku
    async deletePost(postId) {
        try {
            const query = 'DELETE FROM Prispevek WHERE PrispevekID = ?';
            await this.pool.query(query, [postId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci s příspěvky...
}

module.exports = PostModel;
