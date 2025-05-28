const bcrypt = require('bcrypt');
const pool = require('../data/db');

async function seedUsers() {
    try {
        console.log('Iniciando seed de usuários...');

        // Senhas hasheadas (todas usarão "senha123" como senha original)
        const passwordHash = await bcrypt.hash('senha123', 10);
        const adminPasswordHash = await bcrypt.hash('admin123', 10);

        // Usuários de teste
        const users = [
            // Administrador
            {
                name: 'Administrador',
                email: 'admin@example.com',
                password_hash: adminPasswordHash,
                is_active: true
            },
            // Usuários comuns
            {
                name: 'João Silva',
                email: 'joao@example.com',
                password_hash: passwordHash,
                is_active: true
            },
            {
                name: 'Maria Souza',
                email: 'maria@example.com',
                password_hash: passwordHash,
                is_active: true
            },
            {
                name: 'Carlos Oliveira',
                email: 'carlos@example.com',
                password_hash: passwordHash,
                is_active: false // Usuário inativo
            },
            {
                name: 'Ana Pereira',
                email: 'ana@example.com',
                password_hash: passwordHash,
                is_active: true
            }
        ];

        // Inserir usuários
        for (const user of users) {
            await pool.query(
                'INSERT INTO users (name, email, password_hash, is_active) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING',
                [user.name, user.email, user.password_hash, user.is_active]
            );
        }

        console.log('Seed de usuários concluído com sucesso!');
    } catch (error) {
        console.error('Erro ao executar seed de usuários:', error);
    } finally {
        pool.end();
    }
}

// Executar o seed
seedUsers();