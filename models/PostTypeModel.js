class PostTypeModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro získání všech typů příspěvků
    async getAllPostTypes() {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM TypPrispevku');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro získání typu příspěvku podle ID
    async getPostTypeById(typeId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM TypPrispevku WHERE TypprispevkuID = ?', [typeId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro přidání nového typu příspěvku
    async addPostType(typeName) {
        try {
            const query = 'INSERT INTO TypPrispevku (Typ) VALUES (?)';
            const [result] = await this.pool.query(query, [typeName]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro aktualizaci typu příspěvku
    async updatePostType(typeId, newName) {
        try {
            const query = 'UPDATE TypPrispevku SET Typ = ? WHERE TypprispevkuID = ?';
            await this.pool.query(query, [newName, typeId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro smazání typu příspěvku
    async deletePostType(typeId) {
        try {
            const query = 'DELETE FROM TypPrispevku WHERE TypprispevkuID = ?';
            await this.pool.query(query, [typeId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci s typy příspěvků...
}

module.exports = PostTypeModel;
