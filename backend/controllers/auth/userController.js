const userModel = require('../../models/auth/userModel');
const { validationResult } = require('express-validator');

module.exports = {

    // ========== ROTAS DE TEMPLATE ==========
    renderList: async (req, res) => {
        try {
            const users = await userModel.getAll();
            res.render('auth/admin/usuarios/usuarios', {
                csrfToken: req.csrfToken(),
                users
            });
        } catch (error) {
            console.error(error);
            res.status(500).render('error', { message: 'Erro ao carregar página' });
        }
    },

    renderCreateForm: (req, res) => {
        res.render('auth/admin/usuarios/usuarios_novo', {
            csrfToken: req.csrfToken()
        });
    },

    renderEditForm: async (req, res) => {
        const user = await userModel.getById(req.params.id);
        res.render('auth/admin/usuarios/usuarios_editar', {
            csrfToken: req.csrfToken(),
            user
        });
    },

    // ========== ROTAS API ==========
    listAPI: async (req, res) => {
        try {
            const users = await userModel.getAll();
            res.json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error('API Error:', error);
            res.status(500).json({
                success: false,
                error: 'Erro no servidor'
            });
        }        
    },

    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const novo = await userModel.create(req.body);
        res.json({ success: true, data: novo });
    },

    update: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const atualizado = await userModel.update(req.params.id, req.body);
        res.json({ success: true, data: atualizado });
    },

    toggle: async (req, res) => {
        const result = await userModel.toggleActive(req.params.id, req.body.is_active);
        res.json({ success: true, data: result });
    }

};
