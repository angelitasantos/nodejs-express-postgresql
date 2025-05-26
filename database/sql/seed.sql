-- Grupos básicos
INSERT INTO groups (name, description, level) VALUES 
('SUPER', 'Acesso total ao sistema', 100),
('ADMIN', 'Administradores do sistema', 80),
('GERENTE', 'Gerentes de departamento', 60),
('OPERACIONAL', 'Equipe operacional', 40),
('VISITANTE', 'Apenas visualização', 20);

-- Páginas principais
INSERT INTO pages (route, name, module, icon) VALUES
('/admin', 'Dashboard', 'admin', 'dashboard'),
('/admin/users', 'Usuários', 'admin', 'people'),
('/admin/groups', 'Grupos', 'admin', 'groups'),
('/admin/permissions', 'Permissões', 'admin', 'lock'),
('/reports', 'Relatórios', 'reports', 'description');

-- Permissões básicas
INSERT INTO permissions (code, description) VALUES
('users:create', 'Criar novos usuários'),
('users:read', 'Visualizar usuários'),
('users:update', 'Editar usuários'),
('users:delete', 'Remover usuários'),
('groups:manage', 'Gerenciar grupos');

-- Atribuição de páginas ao grupo ADMIN
INSERT INTO group_pages (group_id, page_id, can_view) VALUES
(2, 1, true), (2, 2, true), (2, 3, true), (2, 4, true);

-- Atribuição de permissões ao grupo ADMIN
INSERT INTO group_permissions (group_id, permission_id) VALUES
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5);

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
