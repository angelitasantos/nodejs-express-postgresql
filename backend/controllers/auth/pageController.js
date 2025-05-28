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
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro ao carregar páginas');
        }
    },

    renderCreateForm: (req, res) => {
        try {
            res.render('auth/admin/paginas/paginas_novo', {
                csrfToken: req.csrfToken(),
                page: null
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao carregar formulário');
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
            console.error(error);
            res.status(500).send('Erro ao carregar formulário de edição');
        }
    },

    // ========== ROTAS API ==========
    listAPI: async (req, res) => {
        try {
            const pages = await pageModel.getAll();
            res.json({ success: true, data: pages });
        } catch (err) {
            res.status(500).json({ success: false, error: 'Erro ao listar páginas' });
        }
    },

    create: async (req, res) => {
        try {
            const nova = await pageModel.create(req.body);
            res.json({ success: true, data: nova });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    update: async (req, res) => {
        try {
            const atualizada = await pageModel.update(req.params.id, req.body);
            res.json({ success: true, data: atualizada });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    toggleActive: async (req, res) => {
        try {
            const resultado = await pageModel.toggleActive(req.params.id, req.body.is_active);
            res.json({ success: true, data: resultado });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    }
};
