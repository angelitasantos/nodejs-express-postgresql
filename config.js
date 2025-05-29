require('dotenv').config();

module.exports = {
    app: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
        trustProxy: process.env.TRUST_PROXY || 1
    },
    paths: {
        static: 'frontend/static',
        views: 'frontend/templates'
    },
    security: {
        helmet: {
            // Configurações padrão do helmet
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", "data:"]
                }
            },
            hsts: {
                maxAge: 63072000, // 2 anos em segundos
                includeSubDomains: true,
                preload: true
            }
        },
        cors: {
            origin: process.env.CORS_ORIGIN || '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }
    }
};