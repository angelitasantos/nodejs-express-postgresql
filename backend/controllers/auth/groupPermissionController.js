const model = require('../../models/auth/groupPermissionModel');
const groupModel = require('../../models/auth/groupModel');

module.exports = {

    // ========== ROTAS DE TEMPLATE ==========
    renderForm: async (req, res) => {
        try {
        const groupId = req.params.id;
        const group = await groupModel.getById(req.params.id);
        const permissions = await model.getPermissionsByGroup(groupId);
        res.render('auth/admin/grupos/grupos_permissoes', {
            csrfToken: req.csrfToken(),
            group,
            permissions
        });
        } catch (error) {
            res.status(500).send('Erro ao carregar formulário!');
        }
    },

    // ========== ROTAS API ==========
    save: async (req, res) => {
        try {
            const groupId = req.params.id;
            const { permissionIds } = req.body;
            const result = await model.setGroupPermissions(groupId, permissionIds || []);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
};