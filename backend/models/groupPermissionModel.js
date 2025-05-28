const pool = require('../../database/data/db');

module.exports = {

    async getPermissionsByGroup(groupId) {
        const result = await pool.query(`
            SELECT 
                p.id, p.code, p.description, p.is_active,
                CASE WHEN gp.permission_id IS NOT NULL THEN TRUE ELSE FALSE END AS assigned
            FROM permissions p
            LEFT JOIN group_permissions gp
                ON p.id = gp.permission_id AND gp.group_id = $1
            WHERE p.is_active = TRUE
            ORDER BY p.code
            `, [groupId]);
        return result.rows;
    },

    async setGroupPermissions(groupId, permissionIds) {
        await pool.query('DELETE FROM group_permissions WHERE group_id = $1', [groupId]);

        if (permissionIds.length === 0) return [];

        const values = permissionIds.map(id => `(${groupId}, ${id}, true)`).join(',');
        const result = await pool.query(`
            INSERT INTO group_permissions (group_id, permission_id, can_view)
            VALUES ${values}
            RETURNING *
        `);
        return result.rows;
    }
    
};