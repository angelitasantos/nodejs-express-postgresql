const bcrypt = require('bcrypt');
const pool = require('../data/db');

async function runAllSeeds() {
    try {
        console.log('Iniciando seeds completos...');
        
        // 1. Seed de Grupos
        await pool.query(`
            INSERT INTO groups (name, description, is_active, level)
            VALUES 
                ('Administradores', 'Acesso total ao sistema', true, 1),
                ('Gerentes', 'Gerencia equipes e projetos', true, 10),
                ('Usuários', 'Usuários comuns do sistema', true, 50),
                ('Inativos', 'Usuários sem acesso', false, 100)
            ON CONFLICT (name) DO NOTHING
        `);

        // 2. Seed de Páginas
        await pool.query(`
            INSERT INTO pages (route, name, module, is_active, icon)
            VALUES
                ('/admin/usuarios', 'Gerenciar Usuários', 'admin', true, 'users'),
                ('/admin/grupos', 'Gerenciar Grupos', 'admin', true, 'groups'),
                ('/dashboard', 'Dashboard', 'main', true, 'dashboard'),
                ('/relatorios', 'Relatórios', 'reports', true, 'file-text')
            ON CONFLICT (route) DO NOTHING
        `);

        // 3. Seed de Permissões
        await pool.query(`
            INSERT INTO permissions (code, is_active, description)
            VALUES
                ('users:create', true, 'Criar novos usuários'),
                ('users:edit', true, 'Editar usuários existentes'),
                ('users:delete', true, 'Remover usuários'),
                ('groups:manage', true, 'Gerenciar grupos de usuários')
            ON CONFLICT (code) DO NOTHING
        `);

        // 4. Associar usuários a grupos (após criar ambos)
        await pool.query(`
            INSERT INTO user_groups (user_id, group_id)
            VALUES
                ((SELECT id FROM users WHERE email = 'admin@example.com'), 
                 (SELECT id FROM groups WHERE name = 'Administradores')),
                
                ((SELECT id FROM users WHERE email = 'joao@example.com'), 
                 (SELECT id FROM groups WHERE name = 'Gerentes')),
                
                ((SELECT id FROM users WHERE email = 'maria@example.com'), 
                 (SELECT id FROM groups WHERE name = 'Usuários')),
                
                ((SELECT id FROM users WHERE email = 'ana@example.com'), 
                 (SELECT id FROM groups WHERE name = 'Usuários'))
            ON CONFLICT (user_id, group_id) DO NOTHING
        `);

        console.log('Todos os seeds foram executados com sucesso!');
    } catch (error) {
        console.error('Erro ao executar seeds:', error);
    } finally {
        pool.end();
    }
}

runAllSeeds();