const model = require('../../models/groupPermissionModel');
const groupModel = require('../../models/groupModel');

module.exports = {

    // ========== ROTAS DE TEMPLATE ==========
    renderForm: async (req, res) => {
        try {
        const groupId = req.params.id;
        // const group = await groupModel.getById(groupId);
        console.log('ID recebido:', req.params.id);
        const group = await groupModel.getById(req.params.id);
        console.log('Grupo carregado:', group);
        const permissions = await model.getPermissionsByGroup(groupId);

        res.render('auth/admin/grupos/grupos_permissoes', {
            csrfToken: req.csrfToken(),
            group,
            permissions
        });
        } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao carregar permissões do grupo.');
        }
    },

    // ========== ROTAS API ==========
    save: async (req, res) => {
        try {
        const groupId = req.params.id;
        const { permissionIds } = req.body;
        const result = await model.setGroupPermissions(groupId, permissionIds || []);
        res.json({ success: true, data: result });
        } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
        }
    }
    
};