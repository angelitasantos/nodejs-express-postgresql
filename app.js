const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./config');

class App {
    constructor() {
        this.app = express();
        this.port = config.app.port;
        this.env = config.app.env;

        this.initializeMiddlewares();
        this.initializeSecurity();
        this.initializeViewEngine();
        this.initializeStaticFiles();
        this.initializeRoutes();
    }

    initializeMiddlewares() {
        // Configurações básicas de middleware
        this.app.set('trust proxy', config.app.trustProxy);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    initializeSecurity() {
        // Configuração do Helmet
        this.app.use(helmet(config.security.helmet));

        // Configuração do CORS
        this.app.use(cors(config.security.cors));

        // Middleware de segurança adicional
        this.app.disable('x-powered-by'); // Remove o header X-Powered-By
    }

    initializeViewEngine() {
        // Configura EJS como view engine
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, config.paths.views));
    }

    initializeStaticFiles() {
        // Middleware para arquivos estáticos
        this.app.use(express.static(path.join(__dirname, config.paths.static)));
    }

    initializeRoutes() {
        // Importa e usa todas as rotas
        const routes = require('./server.js');
        this.app.use(routes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor http://localhost:${this.port}`);
            console.log(`Ambient: ${this.env}`);
            console.log(`Security mode: ${this.env === 'production' ? 'Strict' : 'Development'}`);
        });
    }
}

// Instala e inicia a aplicação
const server = new App();
server.listen();
