const { Pool } = require('pg');

// Configuração do pool de conexões
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Função para executar queries
exports.query = (text, params) => pool.query(text, params);

// Função para testar a conexão
async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('✅ Conexão com PostgreSQL estabelecida com sucesso!');
        client.release();

        // Opcional: Executar uma query simples para verificação adicional
        const res = await pool.query('SELECT NOW() as current_time');
        // console.log('⏱️ Hora atual no banco:', res.rows[0].current_time);

        return true;
    } catch (error) {
        console.error('❌ Falha na conexão com PostgreSQL:', error.message);
        return false;
    }
}

// Função genérica que verifica qualquer tabela
async function checkTableExists(tableName) {
    try {
        const client = await pool.connect();

        const query = `
            SELECT EXISTS (
                SELECT FROM pg_tables
                WHERE schemaname = 'public' 
                AND tablename = $1
            );
        `;
        
        const res = await client.query(query, [tableName]);
        client.release();

        const exists = res.rows[0].exists;
        if (exists) {
            console.log(`✅ Tabela "${tableName}" encontrada no banco de dados.`);
        } else {
            console.error(`❌ Tabela "${tableName}" NÃO existe no banco de dados.`);
        }

        return exists;
    } catch (error) {
        console.error(`❌ Erro ao verificar tabela "${tableName}":`, error.message);
        return false;
    }
}

// Testar a conexão automaticamente ao carregar o módulo
testConnection();

// Verificar tabelas necessárias
/*
checkTableExists('contatos');
checkTableExists('groups');
checkTableExists('permissions');
checkTableExists('pages');
checkTableExists('group_pages');
checkTableExists('group_permissions');
checkTableExists('users');
checkTableExists('user_groups');
*/

module.exports = pool;