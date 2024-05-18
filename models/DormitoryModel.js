class DormitoryModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addDormitory(dormitoryData) {
        try {
            const query = 'INSERT INTO Kolej (Adresa, Nazev) VALUES (ST_GeomFromText(?), ?)';
            const [result] = await this.pool.query(query, [`POINT(${dormitoryData.latitude} ${dormitoryData.longitude})`, dormitoryData.Nazev]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getDormitoryById(dormitoryId) {
        try {
            const [rows] = await this.pool.query('SELECT KolejID, ST_AsText(Adresa) as Adresa, Nazev FROM Kolej WHERE KolejID = ?', [dormitoryId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getAllDormitories() {
        try {
            const [rows] = await this.pool.query('SELECT KolejID, ST_AsText(Adresa) as Adresa, Nazev FROM Kolej');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async updateDormitory(dormitoryId, newData) {
        try {
            const query = 'UPDATE Kolej SET Adresa = ST_GeomFromText(?), Nazev = ? WHERE KolejID = ?';
            await this.pool.query(query, [`POINT(${newData.latitude} ${newData.longitude})`, newData.Nazev, dormitoryId]);
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
}

module.exports = DormitoryModel;
