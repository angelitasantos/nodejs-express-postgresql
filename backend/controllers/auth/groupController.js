const groupModel = require('../../models/auth/groupModel');
const { validationResult } = require('express-validator');

class GroupController {
    
    // ========== ROTAS DE TEMPLATE ==========
    async renderList(req, res) {
        try {
            const groups = await groupModel.getAll();
            res.render('auth/admin/grupos/grupos', {
                csrfToken: req.csrfToken(),
                groups: groups
            });
        } catch (error) {
            console.error('Erro ao renderizar lista de registros:', error);
            res.status(500).render('error', { message: 'Erro ao carregar página!' });
        }
    }

    renderCreateForm(req, res) {
        try {
            res.render('auth/admin/grupos/grupos_novo', {
                csrfToken: req.csrfToken(),
                group: null
            });
        } catch (error) {
            console.error('Erro ao renderizar formulário de criação:', error);
            res.status(500).render('error', { message: 'Erro ao carregar formulário!' });
        }
    }

    async renderEditForm(req, res) {
        try {
            const group = await groupModel.getById(req.params.id);
            if (!group) {
                return res.status(404).render('error', { message: 'Registro não encontrado!' });
            }

            res.render('auth/admin/grupos/grupos_editar', {
                csrfToken: req.csrfToken(),
                group
            });
        } catch (error) {
            console.error('Erro ao renderizar formulário de edição:', error);
            res.status(500).render('error', { message: 'Erro ao carregar formulário!' });
        }
    }

    // ========== ROTAS API ==========
    async listAPI(req, res) {
        try {
            const groups = await groupModel.getAll();
            res.json({
                success: true,
                data: groups
            });
        } catch (error) {
            console.error('Erro na API de listagem:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Erro interno ao listar registros!' 
            });
        }
    }

    async create(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    success: false,
                    errors: errors.array() 
                });
            }

            const newGroup = await groupModel.create(req.body);
            res.json({ 
                success: true, 
                data: newGroup 
            });
        } catch (error) {
            console.error('Erro na criação de registro:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Erro interno ao criar registro!' 
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ 
                    success: false,
                    errors: errors.array() 
                });
            }

            const updatedGroup = await groupModel.update(id, req.body);
            if (!updatedGroup) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Registro não encontrado!' 
                });
            }

            res.json({ 
                success: true, 
                data: updatedGroup 
            });
        } catch (error) {
            console.error('Erro na atualização de registro:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Erro interno ao atualizar registro!' 
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const deletedGroup = await groupModel.delete(id);
            
            if (!deletedGroup) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Registro não encontrado!' 
                });
            }

            res.json({ 
                success: true, 
                data: deletedGroup 
            });
        } catch (error) {
            console.error('Erro ao deletar registro:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Erro interno ao deletar registro!' 
            });
        }
    }

    async toggleStatus(req, res) {
        try {
            const id = req.params.id;
            const group = await groupModel.getById(id);
            
            if (!group) {
                return res.status(404).json({ 
                    success: false,
                    error: 'Registro não encontrado!' 
                });
            }

            const updatedGroup = await groupModel.update(id, { 
                is_active: !group.is_active 
            });

            res.json({ 
                success: true, 
                data: updatedGroup 
            });
        } catch (error) {
            console.error('Erro no toggleStatus:', error);
            res.status(500).json({ 
                success: false, 
                error: 'Erro interno ao alterar registro!' 
            });
        }
    }

}

module.exports = new GroupController();