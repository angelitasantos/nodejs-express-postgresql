const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const controller = require('../controllers/auth/pageController');

// ========== ROTAS DE TEMPLATE ==========
router.get('/', csrfProtection, controller.renderList);
router.get('/novo', csrfProtection, controller.renderCreateForm);
router.get('/:id/editar', csrfProtection, controller.renderEditForm);

// ========== ROTAS API ==========
router.get('/api/pages', controller.listAPI);
router.post('/api/pages', express.json(), controller.create);
router.put('/api/pages/:id', express.json(), controller.update);
router.patch('/api/pages/:id/toggle', express.json(), controller.toggleActive);

module.exports = router;
