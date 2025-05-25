const { Pool } = require('pg');

// Configuração do pool de conexões
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Função para testar a conexão
async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('✅ Conexão com PostgreSQL estabelecida com sucesso!');
        client.release();

        // Opcional: Executar uma query simples para verificação adicional
        const res = await pool.query('SELECT NOW() as current_time');
        console.log('⏱️ Hora atual no banco:', res.rows[0].current_time);

        return true;
    } catch (error) {
        console.error('❌ Falha na conexão com PostgreSQL:', error.message);
        return false;
    }
}

// Testar a conexão automaticamente ao carregar o módulo
testConnection();

module.exports = pool;