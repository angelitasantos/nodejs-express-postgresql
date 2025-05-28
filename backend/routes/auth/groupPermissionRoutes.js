const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const controller = require('../../controllers/auth/groupPermissionController');

// ========== ROTAS DE TEMPLATE ==========
router.get('/:id/permissoes', csrfProtection, controller.renderForm);

// ========== ROTAS API ==========
router.post('/:id/permissoes', express.json(), controller.save);

module.exports = router;
