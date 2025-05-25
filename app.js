require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'frontend', 'static')));

// Importa todas as rotas do server.js
const routes = require('./server.js');
app.use('/', routes); // Todas as rotas serão acessíveis a partir de /

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
