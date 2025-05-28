const groupModel = require('../../models/auth/groupModel');
const model = require('../../models/auth/groupPageModel');

module.exports = {

    // ========== ROTAS DE TEMPLATE ==========
    renderForm: async (req, res) => {
        const groupId = req.params.id;

        try {
            const group = await groupModel.getById(groupId);
            const pages = await model.getPagesByGroup(groupId);

            res.render('auth/admin/grupos/grupos_paginas', {
                csrfToken: req.csrfToken(),
                group,
                pages
            });
        } catch (error) {
            res.status(500).send('Erro ao carregar formulário!');
        }
    },

    // ========== ROTAS API ==========
    save: async (req, res) => {
        const groupId = req.params.id;
        const { pageIds } = req.body;

        try {
            const result = await model.setGroupPages(groupId, pageIds || []);
            res.json({ success: true, data: result });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
    
};
