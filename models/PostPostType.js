class PostPostTypeModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro přidání typu příspěvku k příspěvku
    async addPostTypeToPost(postId, typeId) {
        try {
            const query = 'INSERT INTO PrispevekTypPrispevku (PrispevekID, TypprispevkuID) VALUES (?, ?)';
            const [result] = await this.pool.query(query, [postId, typeId]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro odebrání typu příspěvku od příspěvku
    async removePostTypeFromPost(postId, typeId) {
        try {
            const query = 'DELETE FROM PrispevekTypPrispevku WHERE PrispevekID = ? AND TypprispevkuID = ?';
            await this.pool.query(query, [postId, typeId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro získání typů příspěvků spojených s příspěvkem
    async getPostTypesForPost(postId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM PrispevekTypPrispevku WHERE PrispevekID = ?', [postId]);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci s příspěvky a jejich typy...
}

module.exports = PostPostTypeModel;
