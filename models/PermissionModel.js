class PermissionModel {
    constructor(pool) {
        this.pool = pool;
    }

    async addPermission(permissionData) {
        try {
            const query = 'INSERT INTO Opravneni (Moderator, Povoleni_hlaseni, Povoleni_komentare, Povoleni_prispevky, Povoleni_zpravy) VALUES (?, ?, ?, ?, ?)';
            const [result] = await this.pool.query(query, [permissionData.Moderator, permissionData.Povoleni_hlaseni, permissionData.Povoleni_komentare, permissionData.Povoleni_prispevky, permissionData.Povoleni_zpravy]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    async getPermissionById(permissionId) {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Opravneni WHERE OpravneniID = ?', [permissionId]);
            return rows[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getAllPermissions() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM Opravneni');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    async updatePermission(permissionId, newData) {
        try {
            const query = 'UPDATE Opravneni SET Moderator = ?, Povoleni_hlaseni = ?, Povoleni_komentare = ?, Povoleni_prispevky = ?, Povoleni_zpravy = ? WHERE OpravneniID = ?';
            await this.pool.query(query, [newData.Moderator, newData.Povoleni_hlaseni, newData.Povoleni_komentare, newData.Povoleni_prispevky, newData.Povoleni_zpravy, permissionId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deletePermission(permissionId) {
        try {
            const query = 'DELETE FROM Opravneni WHERE OpravneniID = ?';
            await this.pool.query(query, [permissionId]);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = PermissionModel;
