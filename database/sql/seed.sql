-- Grupos básicos
INSERT INTO groups (name, description, level, is_active) VALUES
('SUPER', 'Acesso total ao sistema', 1, TRUE),
('ADMIN', 'Administração de usuários e permissões', 2, TRUE),
('OPERACIONAL', 'Usuário do dia a dia, acesso limitado', 10, TRUE),
('VISUALIZADOR', 'Somente leitura', 20, TRUE);

-- Páginas principais
INSERT INTO pages (route, name, module, icon, is_active) VALUES
('/usuarios', 'Usuários', 'admin', 'user', TRUE),
('/usuarios/novo', 'Novo Usuário', 'admin', 'user-plus', TRUE),
('/grupos', 'Grupos', 'admin', 'users', TRUE),
('/grupos/novo', 'Novo Grupo', 'admin', 'users-plus', TRUE),
('/permissoes', 'Permissões', 'admin', 'shield', TRUE),
('/paginas', 'Páginas do Sistema', 'admin', 'list', TRUE),
('/dashboard', 'Dashboard', 'geral', 'bar-chart', TRUE),
('/producao', 'Produção', 'operacional', 'settings', TRUE),
('/estoque', 'Estoque', 'operacional', 'box', TRUE);

-- Permissões básicas
INSERT INTO permissions (code, description, is_active) VALUES
('users:create', 'Criar usuários', TRUE),
('users:edit', 'Editar usuários', TRUE),
('users:delete', 'Excluir usuários', TRUE),
('groups:create', 'Criar grupos', TRUE),
('groups:edit', 'Editar grupos', TRUE),
('groups:delete', 'Excluir grupos', TRUE),
('permissions:edit', 'Editar permissões', TRUE),
('pages:manage', 'Gerenciar páginas', TRUE);

-- Atribuição de páginas ao grupo ADMIN
INSERT INTO group_pages (group_id, page_id, can_view) VALUES
(2, 1, true), (2, 2, true), (2, 3, true), (2, 4, true);

-- Atribuição de permissões ao grupo ADMIN
INSERT INTO group_permissions (group_id, permission_id) VALUES
(2, 1, true), (2, 2, true), (2, 3, true), (2, 4, true), (2, 5, true);

-- Verifica se um usuário tem acesso a uma rota
SELECT p.* FROM pages p
    JOIN group_pages gp ON gp.page_id = p.id
    JOIN user_groups ug ON ug.group_id = gp.group_id
    WHERE ug.user_id = 1 AND p.route = '/admin/users' AND gp.can_view = true;

-- Verifica se um usuário tem uma permissão específica
    SELECT * FROM permissions p
    JOIN group_permissions gp ON gp.permission_id = p.id
    JOIN user_groups ug ON ug.group_id = gp.group_id
    WHERE ug.user_id = 1 AND p.code = 'users:create';

-- Consulta que considera a hierarquia de grupos
SELECT p.* FROM pages p
    JOIN group_pages gp ON gp.page_id = p.id
    JOIN groups g ON g.id = gp.group_id
    JOIN user_groups ug ON ug.group_id = g.id
    WHERE ug.user_id = 1 
        AND gp.can_view = true
        AND g.level >= (SELECT level FROM groups WHERE id = 2); -- Nível mínimo requerido
