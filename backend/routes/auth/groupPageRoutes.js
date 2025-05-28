const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const controller = require('../../controllers/auth/groupPageController');

// ========== ROTAS DE TEMPLATE ==========
router.get('/:id/paginas', csrfProtection, controller.renderForm);

// ========== ROTAS API ==========
router.post('/:id/paginas', express.json(), controller.save);

module.exports = router;
