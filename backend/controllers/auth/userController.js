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
            res.status(500).render('error', { message: 'Erro ao carregar página!' });
        }
    },

    renderCreateForm: (req, res) => {
        try {
            res.render('auth/admin/usuarios/usuarios_novo', {
                csrfToken: req.csrfToken()
            });
        } catch (error) {
            res.status(500).send('Erro ao carregar formulário!');
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const user = await userModel.getById(req.params.id);
            if (!user) return res.status(404).send('Registro não encontrado!');

            res.render('auth/admin/usuarios/usuarios_editar', {
                csrfToken: req.csrfToken(),
                user
            });
        } catch (error) {
            res.status(500).send('Erro ao carregar formulário!');
        }
    },

    // ========== ROTAS API ==========
    listAPI: async (req, res) => {
        try {
            const users = await userModel.getAll();
            res.json({ success: true, data: users });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }        
    },

    create: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const newUser = await userModel.create(req.body);
            res.json({ success: true, data: newUser });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const updatedUser = await userModel.update(id, req.body);
            res.json({ success: true, data: updatedUser });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    toggle: async (req, res) => {
        try {
            const result = await userModel.toggleActive(req.params.id, req.body.is_active);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

};
