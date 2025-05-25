const express = require('express');
const router = express.Router();
const pool = require('./database/data/db');
const dbTests = require('./database/tests/dbTests');

// Rotas ('/')
const pageRoutes = require('./backend/routes/pageRoutes');
router.get('/', pageRoutes.home);
router.get('/sobre', pageRoutes.sobre);
router.get('/contato', pageRoutes.contato);

// Rota /api (retorna JSON)
router.get('/api', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando!' });
});

// Importa as rotas de teste
// GET /db/bancodados - Teste de conexão básica
// GET /db/tabelacontatos - Teste completo da tabela contatos
if (process.env.NODE_ENV !== 'production') {
    router.use('/db', dbTests);
} else {
    router.use('/db', (req, res) => {
        res.status(404).json({ 
            error: 'Endpoint desativado em produção'
        });
    });
}

// Middleware genérico para outras rotas inexistentes
router.use((req, res) => {
    res.redirect('/');
});

// Exporta o router para ser usado no app.js
module.exports = router;