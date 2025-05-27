const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const { renderTemplate } = require('../helpers/routeHelpers');

// Configuração do CSRF
const csrfProtection = csrf({ cookie: true });

// Middleware para injetar CSRF em todas as rotas
router.use(csrfProtection);

module.exports = {
    // Páginas públicas (sem login)
    login: [csrfProtection, renderTemplate('auth/public/login')],
    esqueceuSenha: [csrfProtection, renderTemplate('auth/public/esqueceu_senha')],
    redefinirSenha: [csrfProtection, renderTemplate('auth/public/redefinir_senha')],

    // Usuários
    usuarios: [csrfProtection, renderTemplate('auth/admin/usuarios/usuarios')],
    usuariosNovo: [csrfProtection, renderTemplate('auth/admin/usuarios/usuarios_novo')],
    usuariosEditar: [csrfProtection, renderTemplate('auth/admin/usuarios/usuarios_editar')],
    minhaConta: [csrfProtection, renderTemplate('auth/admin/usuarios/minha_conta')],

    // Grupos
    grupos: [csrfProtection, renderTemplate('auth/admin/grupos/grupos')],
    gruposNovo: [csrfProtection, renderTemplate('auth/admin/grupos/grupos_novo')],
    gruposEditar: [csrfProtection, renderTemplate('auth/admin/grupos/grupos_editar')],

    // Permissões
    gruposPermissoes: [csrfProtection, renderTemplate('auth/admin/grupos/grupos_permissoes')],
};

// Middleware para enviar token CSRF para todas as views
router.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});
