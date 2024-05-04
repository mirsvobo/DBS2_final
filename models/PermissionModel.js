class PermissionModel {
    constructor(pool) {
        this.pool = pool;
    }

    // Metoda pro získání všech oprávnění
    async getAllPermissions() {
        try {
            const [rows, fields] = await this.pool.query('SELECT * FROM Opravneni');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro přidání nového oprávnění
    async addPermission(permissionData) {
        try {
            const query = 'INSERT INTO Opravneni (Moderator, Povoleni_hlaseni, Povoleni_komentare, Povoleni_prispevky, Povoleni_zpravy) VALUES (?, ?, ?, ?, ?)';
            const [result] = await this.pool.query(query, [permissionData.moderator, permissionData.allowReports, permissionData.allowComments, permissionData.allowPosts, permissionData.allowMessages]);
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro úpravu existujícího oprávnění
    async updatePermission(permissionId, newData) {
        try {
            const query = 'UPDATE Opravneni SET Moderator = ?, Povoleni_hlaseni = ?, Povoleni_komentare = ?, Povoleni_prispevky = ?, Povoleni_zpravy = ? WHERE OpravneniID = ?';
            await this.pool.query(query, [newData.moderator, newData.allowReports, newData.allowComments, newData.allowPosts, newData.allowMessages, permissionId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Metoda pro smazání oprávnění
    async deletePermission(permissionId) {
        try {
            const query = 'DELETE FROM Opravneni WHERE OpravneniID = ?';
            await this.pool.query(query, [permissionId]);
            return true;
        } catch (error) {
            throw error;
        }
    }

    // Další metody modelu pro manipulaci s oprávněními...
}

module.exports = PermissionModel;
