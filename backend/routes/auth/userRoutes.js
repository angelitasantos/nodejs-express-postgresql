const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const controller = require('../../controllers/auth/userController');

// ========== ROTAS DE TEMPLATE ==========
router.get('/', csrfProtection, controller.renderList);
router.get('/novo', csrfProtection, controller.renderCreateForm);
router.get('/:id/editar', csrfProtection, controller.renderEditForm);

// ========== ROTAS API ==========
router.get('/api/usuarios', controller.listAPI);
router.post('/api/usuarios', express.json(), controller.create);
router.put('/api/usuarios/:id', express.json(), controller.update);
router.patch('/api/usuarios/:id/toggle', express.json(), controller.toggle);

module.exports = router;
