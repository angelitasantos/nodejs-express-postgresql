const express = require('express');
const router = express.Router();
const pool = require('./database/data/db');
const dbTests = require('./database/tests/dbTests');

// Rotas ('/')
const pageRoutes = require('./backend/routes/pageRoutes');
router.use(express.urlencoded({ extended: true }));
router.get('/', pageRoutes.home);
router.get('/sobre', pageRoutes.sobre);
router.get('/contato', pageRoutes.contato);
router.post('/enviar-contato', pageRoutes.salvarContato);

// Rotas dos módulos de autenticação
const authRoutes = require('./backend/routes/authRoutes');

// Páginas públicas
router.get('/login', authRoutes.login);
router.get('/esqueceu_senha', authRoutes.esqueceuSenha);
router.get('/redefinir_senha', authRoutes.redefinirSenha);

// Usuários
router.get('/usuarios', authRoutes.usuarios);
router.get('/usuarios/novo', authRoutes.usuariosNovo);
router.get('/usuarios/:id/editar', authRoutes.usuariosEditar);
router.get('/minha_conta', authRoutes.minhaConta);

// Grupos
router.get('/grupos', authRoutes.grupos);
router.get('/grupos/novo', authRoutes.gruposNovo);
router.get('/grupos/:id/editar', authRoutes.gruposEditar);

// Permissões dos grupos
router.get('/grupos/:id/permissoes', authRoutes.gruposPermissoes);

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