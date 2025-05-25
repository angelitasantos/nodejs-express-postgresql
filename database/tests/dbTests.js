const pool = require('../data/db');
const express = require('express');
const router = express.Router();

// Teste básico de conexão
router.get('/bancodados', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW() as current_time');
        res.json({
            status: 'success',
            message: 'Conexão com o banco de dados OK',
            time: result.rows[0].current_time
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Falha na conexão com o banco de dados',
            error: error.message
        });
    }
});

// Teste específico da tabela contatos
router.get('/tabelacontatos', async (req, res) => {
    try {
        // Verifica se a tabela existe
        const exists = await pool.query(`
            SELECT EXISTS (
                SELECT FROM pg_tables
                WHERE schemaname = 'public' 
                AND tablename = 'contatos'
            )
        `);

        if (!exists.rows[0].exists) {
            return res.status(404).json({
                status: 'error',
                message: 'Tabela contatos não encontrada'
            });
        }

        // Verifica se já existem dados de teste
        const existingTest = await pool.query(`
            SELECT id FROM contatos 
            WHERE email = 'teste@example.com' 
            AND nome = 'Teste'
            LIMIT 1
        `);

        let insertedId = null;
        
        // Só insere se não existir registro de teste
        if (existingTest.rows.length === 0) {
            const testInsert = await pool.query(`
                INSERT INTO contatos (nome, email, assunto, mensagem)
                VALUES ('Teste', 'teste@example.com', 'Geral', 'Mensagem de teste')
                RETURNING id
            `);
            insertedId = testInsert.rows[0].id;
        } else {
            insertedId = existingTest.rows[0].id;
        }

        // Conta o total de registros (apenas para informação)
        const totalCount = await pool.query('SELECT COUNT(*) FROM contatos');

        res.json({
            status: 'success',
            message: existingTest.rows.length > 0 
                ? 'Dados de teste já existiam (não foram inseridos novos)' 
                : 'Dados de teste inseridos com sucesso',
            recordId: insertedId,
            tableExists: true,
            totalRecords: parseInt(totalCount.rows[0].count)
        });
        // await pool.query('DELETE FROM contatos WHERE email = $1', ['teste@example.com']);

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Falha ao testar tabela contatos',
            error: error.message
        });
    }
});

module.exports = router;