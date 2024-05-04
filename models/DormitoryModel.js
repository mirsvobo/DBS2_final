class DormitoryModel {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllDormitories() {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Kolej');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async getDormitoryById(dormitoryId) {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Kolej WHERE KolejID = ?', [dormitoryId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async addDormitory(dormitoryData) {
        try {
            const query = 'INSERT INTO Kolej (Nazev, Adresa) VALUES (?, POINT(?, ?))';
            const [result] = await this.pool.query(query, [dormitoryData.name, dormitoryData.latitude, dormitoryData.longitude]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async updateDormitory(dormitoryId, newData) {
        try {
            const query = 'UPDATE Kolej SET Nazev = ?, Adresa = POINT(?, ?) WHERE KolejID = ?';
            await this.pool.query(query, [newData.name, newData.latitude, newData.longitude, dormitoryId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteDormitory(dormitoryId) {
        try {
            const query = 'DELETE FROM Kolej WHERE KolejID = ?';
            await this.pool.query(query, [dormitoryId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci s kolejemi...

}

module.exports = DormitoryModel;
