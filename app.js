require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configura EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend/templates'));

// Middleware para arquivos estáticos
// Configurações básicas
app.set('trust proxy', 1);
app.use(express.static(path.join(__dirname, 'frontend', 'static')));

// Importa todas as rotas do server.js
const routes = require('./server.js');
// Todas as rotas serão acessíveis a partir de /
app.use(routes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
