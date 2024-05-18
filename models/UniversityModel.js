class UniversityModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addUniversity(universityData) {
        try {
            const query = 'INSERT INTO Univerzita (Adresa, Nazev) VALUES (ST_GeomFromText(?), ?)';
            const [result] = await this.pool.query(query, [`POINT(${universityData.latitude} ${universityData.longitude})`, universityData.Nazev]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getUniversityById(universityId) {
        try {
            const [rows] = await this.pool.query('SELECT UniverzitaID, ST_AsText(Adresa) as Adresa, Nazev FROM Univerzita WHERE UniverzitaID = ?', [universityId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getAllUniversities() {
        try {
            const [rows] = await this.pool.query('SELECT UniverzitaID, ST_AsText(Adresa) as Adresa, Nazev FROM Univerzita');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async updateUniversity(universityId, newData) {
        try {
            const query = 'UPDATE Univerzita SET Adresa = ST_GeomFromText(?), Nazev = ? WHERE UniverzitaID = ?';
            await this.pool.query(query, [`POINT(${newData.latitude} ${newData.longitude})`, newData.Nazev, universityId]);
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
