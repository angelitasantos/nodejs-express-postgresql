const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = express.Router();
const pool = require('./database/data/db');

// ===== CONFIGURAÇÕES ESSENCIAIS =====
router.use(cookieParser());
// Para forms HTML
router.use(express.urlencoded({ extended: true }));
// Para APIs JSON
router.use(express.json());

// Configuração de sessão
router.use(session({
    secret: process.env.SESSION_SECRET || 'segredo_dev',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // secure: process.env.NODE_ENV === 'production',
        secure: false, // Mude para true em produção com HTTPS
        httpOnly: true
    }
}));

// Configuração do CSRF
const csrfProtection = csrf({ cookie: true });
router.use(csrfProtection);

// CSRF Protection (exceto para APIs)
router.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    csrf({ cookie: true })(req, res, next);
});

// ===== ROTAS PRINCIPAIS =====
// Rotas site
const homeRoutes = require('./backend/routes/homeRoutes');
router.get('/', homeRoutes.home);
router.get('/sobre', homeRoutes.sobre);
router.get('/contato', homeRoutes.contato);
router.post('/enviar-contato', homeRoutes.salvarContato);

// Rotas de autenticação
const authRoutes = require('./backend/routes/authRoutes');
router.get('/login', authRoutes.login);
router.get('/esqueceu_senha', authRoutes.esqueceuSenha);
router.get('/redefinir_senha', authRoutes.redefinirSenha);

// Usuários
router.get('/usuarios', authRoutes.usuarios);
router.get('/usuarios/novo', authRoutes.usuariosNovo);
router.get('/usuarios/:id/editar', authRoutes.usuariosEditar);
router.get('/minha_conta', authRoutes.minhaConta);

// Rotas de grupos
const groupRoutes = require('./backend/routes/groupRoutes');
router.use('/grupos', groupRoutes);
router.get('/grupos/novo', groupRoutes);
router.get('/grupos/:id/editar', groupRoutes);

const pageRoutes = require('./backend/routes/pageRoutes');
const permissionRoutes = require('./backend/routes/permissionRoutes');
const groupPageRoutes = require('./backend/routes/groupPageRoutes');
const groupPermissionRoutes = require('./backend/routes/groupPermissionRoutes');

router.use('/paginas', pageRoutes);
router.use('/permissoes', permissionRoutes);
router.use('/grupos', groupPageRoutes);
router.use('/grupos', groupPermissionRoutes);

// ===== ROTAS API =====
router.get('/api', (req, res) => {
    res.json({ status: 'OK', message: 'API funcionando!' });
});

// ===== ROTAS DE TESTE =====
// GET /db/bancodados - Teste de conexão básica
// GET /db/tabelacontatos - Teste completo da tabela contatos
if (process.env.NODE_ENV !== 'production') {
    const dbTests = require('./database/tests/dbTests');
    router.use('/db', dbTests);
}

// ===== HANDLERS FINAIS =====
// 404 para rotas não encontradas
router.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'frontend', 'templates', 'erro_404.html'));
});

// Error handler
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(404).sendFile(path.join(__dirname, 'frontend', 'templates', 'erro_500.html'));
    // res.status(500).json({ error: 'Erro interno no servidor' });
});

router.use((req, res, next) => {
    console.log('=== DEBUG ===');
    console.log('CSRF Token:', req.csrfToken());
    console.log('Cookies:', req.cookies);
    console.log('Session:', req.session);
    next();
});

/* 
router.use((req, res, next) => {
    console.log('==> Nova requisição:', req.method, req.path);
    next();
});

// Liste todas as rotas registradas
console.log('Rotas registradas:');
router.stack.forEach(layer => {
    if (layer.route) {
        console.log(
            `${Object.keys(layer.route.methods).join(', ')} -> ${layer.route.path}`
        );
    }
});
*/

module.exports = router;