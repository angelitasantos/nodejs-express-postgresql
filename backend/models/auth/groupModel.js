const pool = require('../../../database/data/db');

class GroupModel {

    async getAll() {
        try {
            const result = await pool.query('SELECT * FROM groups ORDER BY name');
            return result.rows;
        } catch (error) {
            console.error('Erro ao buscar todos os registros:', error);
            throw new Error('Falha ao recuperar registros!');
        }
    }

    async getById(id) {
        try {
            const result = await pool.query('SELECT * FROM groups WHERE id = $1', [id]);
            return result.rows[0] || null;
        } catch (error) {
            console.error(`Erro ao buscar registro com ID ${id}:`, error);
            throw new Error('Falha ao recuperar registro!');
        }
    }

    async create({ name, description, level }) {
        try {
            const result = await pool.query(
                'INSERT INTO groups (name, description, level, is_active) VALUES ($1, $2, $3, $4) RETURNING *',
                [name, description, level, true]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Erro ao criar registro:', error);
            throw new Error('Falha ao criar registro!');
        }
    }

    async update(id, fields) {
        try {
            // Filtra apenas campos que não são nulos/undefined
            const validFields = Object.entries(fields).reduce((acc, [key, value]) => {
                if (value !== null && value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {});

            // Se não há campos válidos, retorna null
            if (Object.keys(validFields).length === 0) {
                return null;
            }

            const keys = Object.keys(validFields);
            const values = Object.values(validFields);
            
            const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
            
            const query = {
                text: `UPDATE groups SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
                values: [...values, id]
            };

            const result = await pool.query(query);
            return result.rows[0] || null;
        } catch (error) {
            console.error(`Erro ao atualizar registro com ID ${id}:`, error);
            throw new Error('Falha ao atualizar registro!');
        }
    }

    async delete(id) {
        try {
            const result = await pool.query(
                'DELETE FROM groups WHERE id = $1 RETURNING *',
                [id]
            );
            return result.rows[0] || null;
        } catch (error) {
            console.error(`Erro ao deletar registro com ID ${id}:`, error);
            throw new Error('Falha ao deletar registro!');
        }
    }

    async toggleStatus(id) {
        try {
            // Primeiro obtém o status atual
            const group = await this.getById(id);
            if (!group) return null;

            const newStatus = !group.is_active;
            const result = await pool.query(
                'UPDATE groups SET is_active = $1 WHERE id = $2 RETURNING *',
                [newStatus, id]
            );
            return result.rows[0];
        } catch (error) {
            console.error(`Erro ao alternar status do registro com ID ${id}:`, error);
            throw new Error('Falha ao alternar status do registro!');
        }
    }

    async getAllActive() {
        try {
            const result = await pool.query(
                'SELECT * FROM groups WHERE is_active = TRUE ORDER BY name'
            );
            return result.rows;
        } catch (error) {
            console.error('Erro ao buscar registros ativos:', error);
            throw new Error('Falha ao recuperar registros ativos!');
        }
    }
    
}

module.exports = new GroupModel();