class UniversityModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addUniversity(universityData) {
        try {
            const query = 'INSERT INTO Univerzita (Adresa, Nazev) VALUES (?, ?)';
            const [result] = await this.pool.query(query, [universityData.Adresa, universityData.Nazev]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getUniversityById(universityId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Univerzita WHERE UniverzitaID = ?', [universityId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getAllUniversities() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Univerzita');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async updateUniversity(universityId, newData) {
        try {
            const query = 'UPDATE Univerzita SET Adresa = ?, Nazev = ? WHERE UniverzitaID = ?';
            await this.pool.query(query, [newData.Adresa, newData.Nazev, universityId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteUniversity(universityId) {
        try {
            const query = 'DELETE FROM Univerzita WHERE UniverzitaID = ?';
            await this.pool.query(query, [universityId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UniversityModel;
