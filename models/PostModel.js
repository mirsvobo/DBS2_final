const pool = require('../db');
const logger = require('../logger');

class PostModel {
    async getAllPosts() {
        try {
            const [rows] = await pool.query('SELECT * FROM Prispevek');
            return rows;
        } catch (error) {
            logger.error(`Error in PostModel.getAllPosts: ${error.message}`);
            throw error;
        }
    }

    async getPostById(postId) {
        try {
            const [rows] = await pool.query('SELECT * FROM Prispevek WHERE PrispevekID = ?', [postId]);
            return rows[0] || null;
        } catch (error) {
            logger.error(`Error in PostModel.getPostById: ${error.message}`);
            throw error;
        }
    }

    async createPost(postData) {
        try {
            const query = 'INSERT INTO Prispevek (Cas_odeslani, Obrazek, Obsah_prispevku, Typ_prispevku, UzivatelID) VALUES (?, ?, ?, ?, ?)';
            const [result] = await pool.query(query, [postData.Cas_odeslani, postData.Obrazek, postData.Obsah_prispevku, postData.Typ_prispevku, postData.UzivatelID]);
            return result.insertId;
        } catch (error) {
            logger.error(`Error in PostModel.createPost: ${error.message}`);
            throw error;
        }
    }

    async updatePost(postId, postData) {
        try {
            const query = 'UPDATE Prispevek SET Cas_odeslani = ?, Obrazek = ?, Obsah_prispevku = ?, Typ_prispevku = ?, UzivatelID = ? WHERE PrispevekID = ?';
            await pool.query(query, [postData.Cas_odeslani, postData.Obrazek, postData.Obsah_prispevku, postData.Typ_prispevku, postData.UzivatelID, postId]);
            return true;
        } catch (error) {
            logger.error(`Error in PostModel.updatePost: ${error.message}`);
            throw error;
        }
    }

    async deletePost(postId) {
        try {
            const query = 'DELETE FROM Prispevek WHERE PrispevekID = ?';
            await pool.query(query, [postId]);
            return true;
        } catch (error) {
            logger.error(`Error in PostModel.deletePost: ${error.message}`);
            throw error;
        }
    }
}

module.exports = PostModel;
