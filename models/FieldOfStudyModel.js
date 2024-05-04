class FieldOfStudyModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro získání všech oborů studia
    async getAllFieldsOfStudy() {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Obor');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro získání oboru studia podle ID
    async getFieldOfStudyById(fieldId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Obor WHERE OborID = ?', [fieldId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro přidání nového oboru studia
    async addFieldOfStudy(fieldName) {
        try {
            const query = 'INSERT INTO Obor (Nazev_oboru) VALUES (?)';
            const [result] = await this.pool.query(query, [fieldName]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro aktualizaci oboru studia
    async updateFieldOfStudy(fieldId, newData) {
        try {
            const query = 'UPDATE Obor SET Nazev_oboru = ? WHERE OborID = ?';
            await this.pool.query(query, [newData.fieldName, fieldId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro smazání oboru studia
    async deleteFieldOfStudy(fieldId) {
        try {
            const query = 'DELETE FROM Obor WHERE OborID = ?';
            await this.pool.query(query, [fieldId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci s obory studia...
}

module.exports = FieldOfStudyModel;
