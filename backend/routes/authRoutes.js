const { renderTemplate } = require('../helpers/routeHelpers');

module.exports = {
    // Páginas públicas (sem login)
    login: renderTemplate('auth/public/login'),
    esqueceuSenha: renderTemplate('auth/public/esqueceu_senha'),
    redefinirSenha: renderTemplate('auth/public/redefinir_senha'),

    // Usuários
    usuarios: renderTemplate('auth/admin/usuarios/usuarios'),
    usuariosNovo: renderTemplate('auth/admin/usuarios/usuarios_novo'),
    usuariosEditar: renderTemplate('auth/admin/usuarios/usuarios_editar'),
    minhaConta: renderTemplate('auth/admin/usuarios/minha_conta'),

    // Grupos
    grupos: renderTemplate('auth/admin/grupos/grupos'),
    gruposNovo: renderTemplate('auth/admin/grupos/grupos_novo'),
    gruposEditar: renderTemplate('auth/admin/grupos/grupos_editar'),

    // Permissões
    gruposPermissoes: renderTemplate('auth/admin/grupos/grupos_permissoes'),
};