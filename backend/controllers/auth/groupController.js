const groupModel = require('../../models/groupModel');
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
            console.error(error);
            res.status(500).render('error', { message: 'Erro ao carregar página' });
        }
    },

    renderCreateForm: (req, res) => {
        try {
            res.render('auth/admin/grupos/grupos_novo', {
                csrfToken: req.csrfToken(),
                group: null
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao carregar formulário');
        }
    },

    renderEditForm: async (req, res) => {
        try {
            const id = req.params.id;
            const group = await groupModel.getById(id);
            if (!group) return res.status(404).send('Grupo não encontrado');

            res.render('auth/admin/grupos/grupos_editar', {
                csrfToken: req.csrfToken(),
                group
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao carregar formulário de edição');
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
            console.error('API Error:', error);
            res.status(500).json({
                success: false,
                error: 'Erro no servidor'
            });
        }
    },

    create: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const newGroup = await groupModel.create(req.body);
            res.json({ success: true, data: newGroup });
            
        } catch (error) {
            res.status(500).json({ 
                success: false,
                error: error.message 
            });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const updatedGroup = await groupModel.update(id, req.body);
            res.json({ success: true, data: updatedGroup });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
};
