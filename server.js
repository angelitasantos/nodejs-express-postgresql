const express = require('express');
const session = require('express-session');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = express.Router();
const pool = require('./database/data/db');
const helmet = require('helmet');

// ===== CONFIGURAÇÕES BÁSICAS =====
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(cookieParser());

// ===== CONFIGURAÇÕES DE SEGURANÇA =====
router.use(helmet({
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "script-src": ["'self'", "'unsafe-inline'"], // Permite scripts inline para CSRF
            "form-action": ["'self'"] // Permite envio de formulários para as próprias rotas
        }
    },
    crossOriginEmbedderPolicy: false // Ajuste para APIs
}));

// ===== CONFIGURAÇÃO DE SESSÃO =====
router.use(session({
    secret: process.env.SESSION_SECRET || 'segredo_dev_fallback',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax', // Balanceamento entre segurança e usabilidade
        maxAge: 24 * 60 * 60 * 1000 // 1 dia
    }
}));

// ===== CSRF PROTECTION =====
const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
});

// Aplica CSRF apenas para rotas não-API
router.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    csrfProtection(req, res, next);
});

// Middleware para injetar token CSRF nas views
router.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken ? req.csrfToken() : '';
    next();
});

// ===== MIDDLEWARE DE AUTENTICAÇÃO =====
router.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.user ? true : false;
    
    if (req.session.user) {
        res.locals.user = {
            id: req.session.user.id,
            name: req.session.user.name,
            email: req.session.user.email
        };
    }
    
    next();
});

// ===== ARQUIVOS ESTÁTICOS =====
router.use(express.static(path.join(__dirname, 'frontend'), {
    maxAge: process.env.NODE_ENV === 'production' ? 86400000 : 0
}));

// ===== ROTAS =====
// Rotas do site público
const homeRoutes = require('./backend/routes/homeRoutes');
router.get('/', homeRoutes.home);
router.get('/menu', homeRoutes.menu);
router.get('/sobre', homeRoutes.sobre);
router.get('/contato', homeRoutes.contato);
router.post('/enviar-contato', homeRoutes.salvarContato);

// Rotas de autenticação
const authRoutes = require('./backend/routes/authRoutes');
router.get('/login', authRoutes.login);
router.get('/esqueceu_senha', authRoutes.esqueceuSenha);
router.get('/redefinir_senha', authRoutes.redefinirSenha);
router.get('/minha_conta', authRoutes.minhaConta);

// Rotas de usuários e grupos
router.use('/usuarios', require('./backend/routes/auth/userRoutes'));
router.use('/grupos', require('./backend/routes/auth/groupRoutes'));
router.use('/paginas', require('./backend/routes/auth/pageRoutes'));
router.use('/permissoes', require('./backend/routes/auth/permissionRoutes'));
router.use('/grupos', require('./backend/routes/auth/groupPageRoutes'));
router.use('/grupos', require('./backend/routes/auth/groupPermissionRoutes'));

// Rota API
router.get('/api', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'API funcionando',
        timestamp: new Date().toISOString()
    });
});

// Rotas de teste (apenas desenvolvimento)
if (process.env.NODE_ENV !== 'production') {
    router.use('/db', require('./database/tests/dbTests'));
    
    // Middleware de debug simplificado
    router.use((req, res, next) => {
        console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
        next();
    });
}

// ===== HANDLERS DE ERRO =====
// Handler para erros CSRF
router.use((err, req, res, next) => {
    if (err.code === 'EBADCSRFTOKEN') {
        if (req.path.startsWith('/api')) {
            return res.status(403).json({ 
                error: 'Token CSRF inválido!',
                redirect: '/'  // Adiciona informação de redirecionamento para APIs
            });
        } else {
            req.session.errorMessage = 'Sessão expirada. Por favor, tente novamente.';
            return res.redirect('/');
        }
    }
    next(err);
});

// 404 para rotas não encontradas
router.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'frontend', 'templates', 'erro_404.html'));
});

// Error handler geral
router.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Erro:`, err.message);
    
    if (req.path.startsWith('/api')) {
        return res.status(500).json({ 
            error: 'Erro interno!',
            message: process.env.NODE_ENV !== 'production' ? err.message : undefined
        });
    }
    
    res.status(500).sendFile(path.join(__dirname, 'frontend', 'templates', 'erro_500.html'));
});

module.exports = router;