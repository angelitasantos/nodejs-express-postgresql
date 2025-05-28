const pool = require('../../../database/data/db');

module.exports = {
    async getAll() {
        const result = await pool.query('SELECT * FROM groups ORDER BY level');
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query('SELECT * FROM groups WHERE id = $1', [id]);
        return result.rows[0];
    },

    async create({ name, description, level }) {
        console.log({ name, description, level })
        const result = await pool.query(
            'INSERT INTO groups (name, description, level) VALUES ($1, $2, $3) RETURNING *',
            [name, description, level]
        );
        return result.rows[0];
    },

    async update(id, { name, description, level }) {
        const result = await pool.query(
            'UPDATE groups SET name = $1, description = $2, level = $3 WHERE id = $4 RETURNING *',
            [name, description, level, id]
        );
        return result.rows[0];
    },

    async toggleActive(id, is_active) {
        const result = await pool.query(
            'UPDATE groups SET is_active = $1 WHERE id = $2 RETURNING *',
            [is_active, id]
        );
        return result.rows[0];
    },

    async getAllActive() {
        const result = await pool.query('SELECT * FROM groups WHERE is_active = TRUE ORDER BY level');
        return result.rows;
    }
};
