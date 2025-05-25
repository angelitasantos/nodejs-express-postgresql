require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Rota principal (/)
app.get('/', (req, res) => {
  res.send(`
    <h1>Página Inicial</h1>
    <p>Sem views, HTML direto na rota!</p>
  `);
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
