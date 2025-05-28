const permissionModel = require('../../models/auth/permissionModel');

module.exports = {

    // ========== ROTAS DE TEMPLATE ==========
    renderList: async (req, res) => {
        try {
            const permissoes = await permissionModel.getAll();
            res.render('auth/admin/permissoes/permissoes', {
                csrfToken: req.csrfToken(),
                permissoes
            });
        } catch (error) {
            res.status(500).send('Erro ao carregar página!');
        }
    },

    // ========== ROTAS API ==========
    listAPI: async (req, res) => {
        try {
            const permissoes = await permissionModel.getAll();
            res.json({ success: true, data: permissoes });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const nova = await permissionModel.create(req.body);
            res.json({ success: true, data: nova });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const atualizada = await permissionModel.update(req.params.id, req.body);
            res.json({ success: true, data: atualizada });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    toggleActive: async (req, res) => {
        try {
            const atualizada = await permissionModel.toggleActive(req.params.id, req.body.is_active);
            res.json({ success: true, data: atualizada });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

};
