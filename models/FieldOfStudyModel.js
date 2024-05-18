class FieldOfStudyModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addFieldOfStudy(fieldData) {
        try {
            const query = 'INSERT INTO Obor (Nazev_oboru) VALUES (?)';
            const [result] = await this.pool.query(query, [fieldData.Nazev_oboru]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getFieldOfStudyById(fieldId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Obor WHERE OborID = ?', [fieldId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getAllFieldsOfStudy() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Obor');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async updateFieldOfStudy(fieldId, newData) {
        try {
            const query = 'UPDATE Obor SET Nazev_oboru = ? WHERE OborID = ?';
            await this.pool.query(query, [newData.Nazev_oboru, fieldId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteFieldOfStudy(fieldId) {
        try {
            const query = 'DELETE FROM Obor WHERE OborID = ?';
            await this.pool.query(query, [fieldId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = FieldOfStudyModel;
