class PostModel {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllPosts() {
        const [rows] = await this.pool.query('SELECT p.*, u.Jmeno, u.Prijmeni FROM Prispevek p JOIN Uzivatel u ON p.UzivatelID = u.UzivatelID');
        return rows;
    }

    async createPost(postData) {
        const { Titulek, Obsah_prispevku, Typ_prispevku, UzivatelID } = postData;
        const [result] = await this.pool.query('INSERT INTO Prispevek (Titulek, Obsah_prispevku, Typ_prispevku, UzivatelID, Cas_odeslani) VALUES (?, ?, ?, ?, NOW())', [Titulek, Obsah_prispevku, Typ_prispevku, UzivatelID]);
        return result.insertId;
    }

    async getPostById(postId) {
        const [rows] = await this.pool.query('SELECT p.*, u.Jmeno, u.Prijmeni FROM Prispevek p JOIN Uzivatel u ON p.UzivatelID = u.UzivatelID WHERE p.PrispevekID = ?', [postId]);
        return rows[0];
    }

    async updatePost(postId, postData) {
        const { Titulek, Obsah_prispevku, Typ_prispevku } = postData;
        await this.pool.query('UPDATE Prispevek SET Titulek = ?, Obsah_prispevku = ?, Typ_prispevku = ? WHERE PrispevekID = ?', [Titulek, Obsah_prispevku, Typ_prispevku, postId]);
    }

    async deletePost(postId) {
        await this.pool.query('DELETE FROM Prispevek WHERE PrispevekID = ?', [postId]);
    }
}

module.exports = PostModel;
