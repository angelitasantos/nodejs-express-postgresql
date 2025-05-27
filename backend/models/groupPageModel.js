const pool = require('../../database/data/db');

module.exports = {

    async getPagesByGroup(groupId) {
        const result = await pool.query(`
            SELECT 
                p.id, p.name, p.route, p.module, 
                CASE WHEN gp.page_id IS NOT NULL THEN TRUE ELSE FALSE END AS can_view
            FROM pages p
            LEFT JOIN group_pages gp
                ON p.id = gp.page_id AND gp.group_id = $1
            WHERE p.is_active = TRUE
            ORDER BY p.module, p.name
        `, [groupId]);
        return result.rows;
    },

    async setGroupPages(groupId, pageIds) {
        await pool.query('DELETE FROM group_pages WHERE group_id = $1', [groupId]);

        if (pageIds.length === 0) return [];

        const values = pageIds.map(id => `(${groupId}, ${id}, true)`).join(',');
        const result = await pool.query(`
            INSERT INTO group_pages (group_id, page_id, can_view)
            VALUES ${values}
            RETURNING *
        `);
        return result.rows;
    }
};
