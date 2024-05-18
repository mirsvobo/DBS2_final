class ReportModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addReport(reportData) {
        try {
            const query = 'INSERT INTO Hlaseni (Cas_hlaseni, Obsah_hlaseni, KomentarID, UzivatelID) VALUES (?, ?, ?, ?)';
            const [result] = await this.pool.query(query, [reportData.Cas_hlaseni, reportData.Obsah_hlaseni, reportData.KomentarID, reportData.UzivatelID]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getReportById(reportId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Hlaseni WHERE HlaseniID = ?', [reportId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getAllReports() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Hlaseni');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async updateReport(reportId, newData) {
        try {
            const query = 'UPDATE Hlaseni SET Cas_hlaseni = ?, Obsah_hlaseni = ?, KomentarID = ?, UzivatelID = ? WHERE HlaseniID = ?';
            await this.pool.query(query, [newData.Cas_hlaseni, newData.Obsah_hlaseni, newData.KomentarID, newData.UzivatelID, reportId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteReport(reportId) {
        try {
            const query = 'DELETE FROM Hlaseni WHERE HlaseniID = ?';
            await this.pool.query(query, [reportId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ReportModel;
