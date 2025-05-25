const express = require('express');
const router = express.Router();

// Rota principal (/)
router.get('/', (req, res) => {
  res.send('<h1>Home</h1><p>Olá! Sem views, HTML direto na rota!');
});

// Rota /sobre
router.get('/sobre', (req, res) => {
  res.send('<h1>Sobre</h1><p>Página sobre o projeto.</p>');
});

// Rota /api (retorna JSON)
router.get('/api', (req, res) => {
  res.json({ status: 'OK', message: 'API funcionando!' });
});

// Exporta o router para ser usado no app.js
module.exports = router;