class UniversityModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro získání všech univerzit
    async getAllUniversities() {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Univerzita');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro získání univerzity podle ID
    async getUniversityById(universityId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Univerzita WHERE UniverzitaID = ?', [universityId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro přidání nové univerzity
    async addUniversity(universityData) {
        try {
            const query = 'INSERT INTO Univerzita (Adresa, Nazev) VALUES (?, ?)';
            const [result] = await this.pool.query(query, [universityData.address, universityData.name]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro aktualizaci informací o univerzitě
    async updateUniversity(universityId, newData) {
        try {
            const query = 'UPDATE Univerzita SET Adresa = ?, Nazev = ? WHERE UniverzitaID = ?';
            await this.pool.query(query, [newData.address, newData.name, universityId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro smazání univerzity
    async deleteUniversity(universityId) {
        try {
            const query = 'DELETE FROM Univerzita WHERE UniverzitaID = ?';
            await this.pool.query(query, [universityId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci s univerzitami...
}

module.exports = UniversityModel;
