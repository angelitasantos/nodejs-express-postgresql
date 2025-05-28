const pageModel = require('../../models/auth/pageModel');

module.exports = {

    // ========== ROTAS DE TEMPLATE ==========
    renderList: async (req, res) => {
        try {
            const pages = await pageModel.getAll();
            res.render('auth/admin/paginas/paginas_sistema', {
                csrfToken: req.csrfToken(),
                pages
            });
        } catch (error) {
            res.status(500).send('Erro ao carregar página!');
        }
    },

    renderCreateForm: (req, res) => {
        try {
            res.render('auth/admin/paginas/paginas_novo', {
                csrfToken: req.csrfToken(),
                page: null
            });
        } catch (error) {
            res.status(500).send('Erro ao carregar formulário!');
        }
    },
    
    renderEditForm: async (req, res) => {
        try {
            const id = req.params.id;
            const page = await pageModel.getById(id);
            if (!page) return res.status(404).send('Pagina não encontrada!');

            res.render('auth/admin/paginas/paginas_editar', {
                csrfToken: req.csrfToken(),
                page
            });
        } catch (error) {
            res.status(500).send('Erro ao carregar formulário!');
        }
    },

    // ========== ROTAS API ==========
    listAPI: async (req, res) => {
        try {
            const pages = await pageModel.getAll();
            res.json({ success: true, data: pages });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const nova = await pageModel.create(req.body);
            res.json({ success: true, data: nova });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const atualizada = await pageModel.update(req.params.id, req.body);
            res.json({ success: true, data: atualizada });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    toggleActive: async (req, res) => {
        try {
            const resultado = await pageModel.toggleActive(req.params.id, req.body.is_active);
            res.json({ success: true, data: resultado });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
};
