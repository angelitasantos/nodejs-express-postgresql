const express = require('express');
const router = express.Router();
const pool = require('./database/data/db');

// Rotas ('/')
const pageRoutes = require('./backend/routes/pageRoutes');
router.get('/', pageRoutes.home);
router.get('/sobre', pageRoutes.sobre);
router.get('/contato', pageRoutes.contato);

// Rota /api (retorna JSON)
router.get('/api', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando!' });
});

// Testar banco de dados
router.get('/testdatabase', async (req, res) => {
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

// Exporta o router para ser usado no app.js
module.exports = router;