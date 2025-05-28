const pool = require('../../../database/data/db');
const bcrypt = require('bcrypt');

module.exports = {

    async getAll() {
        const result = await pool.query('SELECT * FROM users ORDER BY name');
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query('SELECT id, name, email, is_active FROM users WHERE id = $1', [id]);
        return result.rows[0];
    },

    async create({ name, email, password }) {
        const hash = await bcrypt.hash(password, 10);
        const result = await pool.query(`
            INSERT INTO users (name, email, password_hash)
            VALUES ($1, $2, $3) RETURNING id, name, email, is_active
        `, [name, email, hash]);
        return result.rows[0];
    },

    async update(id, { name, email }) {
        const result = await pool.query(`
            UPDATE users SET name = $1, email = $2, updated_at = CURRENT_TIMESTAMP
            WHERE id = $3 RETURNING id, name, email, is_active
        `, [name, email, id]);
        return result.rows[0];
    },

    async toggleActive(id, is_active) {
        const result = await pool.query(`
            UPDATE users SET is_active = $1 WHERE id = $2 RETURNING *
        `, [is_active, id]);
        return result.rows[0];
    }

};
