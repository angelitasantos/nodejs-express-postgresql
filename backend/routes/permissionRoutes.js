const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const controller = require('../controllers/auth/permissionController');

// ========== ROTAS DE TEMPLATE ==========
router.get('/', csrfProtection, controller.renderList);

// ========== ROTAS API ==========
router.get('/api/permissoes', controller.listAPI);
router.post('/api/permissoes', express.json(), controller.create);
router.put('/api/permissoes/:id', express.json(), controller.update);
router.patch('/api/permissoes/:id/toggle', express.json(), controller.toggleActive);

module.exports = router;
