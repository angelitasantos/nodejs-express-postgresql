const permissionModel = require('../../models/permissionModel');

module.exports = {

    // ========== ROTAS DE TEMPLATE ==========
    renderList: async (req, res) => {
        try {
            const permissoes = await permissionModel.getAll();
            res.render('auth/admin/permissoes/permissoes', {
                csrfToken: req.csrfToken(),
                permissoes
            });
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao carregar permissões');
        }
    },

    // ========== ROTAS API ==========
    listAPI: async (req, res) => {
        try {
            const permissoes = await permissionModel.getAll();
            res.json({ success: true, data: permissoes });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    create: async (req, res) => {
        try {
            const nova = await permissionModel.create(req.body);
            res.json({ success: true, data: nova });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const atualizada = await permissionModel.update(req.params.id, req.body);
            res.json({ success: true, data: atualizada });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    toggleActive: async (req, res) => {
        try {
            const atualizada = await permissionModel.toggleActive(req.params.id, req.body.is_active);
            res.json({ success: true, data: atualizada });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
