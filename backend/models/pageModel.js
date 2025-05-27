const pool = require('../../database/data/db');

module.exports = {
    async getAll() {
        const result = await pool.query('SELECT * FROM pages ORDER BY module, name');
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query('SELECT * FROM pages WHERE id = $1', [id]);
        return result.rows[0];
    },

    async create({ route, name, module, icon }) {
        const result = await pool.query(
            'INSERT INTO pages (route, name, module, icon) VALUES ($1, $2, $3, $4) RETURNING *',
            [route, name, module, icon]
        );
        return result.rows[0];
    },

    async update(id, { route, name, module, icon }) {
        const result = await pool.query(
            'UPDATE pages SET route = $1, name = $2, module = $3, icon = $4 WHERE id = $5 RETURNING *',
            [route, name, module, icon, id]
        );
        return result.rows[0];
    },

    async toggleActive(id, is_active) {
        const result = await pool.query(
            'UPDATE pages SET is_active = $1 WHERE id = $2 RETURNING *',
            [is_active, id]
        );
        return result.rows[0];
    }
};
