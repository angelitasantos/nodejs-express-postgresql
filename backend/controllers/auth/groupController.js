const groupModel = require('../../models/auth/groupModel');
const { validationResult } = require('express-validator');

module.exports = {

    // ========== ROTAS DE TEMPLATE ==========
    renderList: async (req, res) => {
        try {
            const grupos = await groupModel.getAll();
            res.render('auth/admin/grupos/grupos', {
                csrfToken: req.csrfToken(),
                grupos: grupos
            });
        } catch (error) {
            res.status(500).render('error', { message: 'Erro ao carregar página!' });
        }
    },

    renderCreateForm: (req, res) => {
        try {
            res.render('auth/admin/grupos/grupos_novo', {
                csrfToken: req.csrfToken(),
                group: null
            });
        } catch (error) {
            res.status(500).send('Erro ao carregar formulário!');
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const group = await groupModel.getById(req.params.id);
            if (!group) return res.status(404).send('Registro não encontrado!');

            res.render('auth/admin/grupos/grupos_editar', {
                csrfToken: req.csrfToken(),
                group
            });
        } catch (error) {
            res.status(500).send('Erro ao carregar formulário!');
        }
    },

    // ========== ROTAS API ==========
    listAPI: async (req, res) => {
        try {
            const grupos = await groupModel.getAll();
            res.json({
                success: true,
                data: grupos
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const newGroup = await groupModel.create(req.body);
            res.json({ success: true, data: newGroup });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

            const updatedGroup = await groupModel.update(id, req.body);
            res.json({ success: true, data: updatedGroup });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
};
