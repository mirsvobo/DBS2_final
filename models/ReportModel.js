class ReportModel {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllReports() {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Hlaseni');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async addReport(reportData) {
        try {
            const query = 'INSERT INTO Hlaseni (Obsah_hlaseni, KomentarID, UzivatelID) VALUES (?, ?, ?)';
            const [result] = await this.pool.query(query, [reportData.content, reportData.commentId, reportData.userId]);
            return result.insertId;
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

    // Další metody modelu pro manipulaci s hlášeními...

}

module.exports = ReportModel;
