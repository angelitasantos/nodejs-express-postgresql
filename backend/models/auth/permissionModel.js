const pool = require('../../../database/data/db');

module.exports = {
    async getAll() {
        const result = await pool.query('SELECT * FROM permissions ORDER BY code');
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query('SELECT * FROM permissions WHERE id = $1', [id]);
        return result.rows[0];
    },

    async create({ code, description }) {
        const result = await pool.query(
            'INSERT INTO permissions (code, description) VALUES ($1, $2) RETURNING *',
            [code, description]
        );
        return result.rows[0];
    },

    async update(id, { code, description }) {
        const result = await pool.query(
            'UPDATE permissions SET code = $1, description = $2 WHERE id = $3 RETURNING *',
            [code, description, id]
        );
        return result.rows[0];
    },

    async toggleActive(id, is_active) {
        const result = await pool.query(
            'UPDATE permissions SET is_active = $1 WHERE id = $2 RETURNING *',
            [is_active, id]
        );
        return result.rows[0];
    }
};
