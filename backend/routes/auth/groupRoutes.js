const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const groupController = require('../../controllers/auth/groupController');
const { checkGroup } = require('../../validators/groupValidator');

// ========== CONFIGURAÇÃO DO CSRF ==========
const csrfProtection = csrf({ cookie: true });

// ========== ROTAS DE TEMPLATE ==========
router.get('/', csrfProtection, groupController.renderList);
router.get('/novo', csrfProtection, groupController.renderCreateForm);
router.get('/:id/editar', csrfProtection, groupController.renderEditForm);

// ========== ROTAS API ==========
router.get('/api/grupos', groupController.listAPI);
router.post('/api/grupos', express.json(), checkGroup(), groupController.create);
router.put('/api/grupos/:id', express.json(), checkGroup(), groupController.update);
router.delete('/api/grupos/:id', groupController.delete);
router.patch('/api/grupos/:id/toggle-status', express.json(), groupController.toggleStatus);

module.exports = router;