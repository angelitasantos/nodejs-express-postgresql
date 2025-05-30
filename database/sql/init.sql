-- criação de tabelas

-- Tabela de Contatos
CREATE TABLE IF NOT EXISTS contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    assunto VARCHAR(30) NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA PRINCIPAL DE USUÁRIOS
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    reset_token VARCHAR(255),
    reset_expires TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA DE GRUPOS
CREATE TABLE IF NOT EXISTS groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    level INTEGER UNIQUE NOT NULL, -- Nível hierárquico (1-100)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA DE PÁGINAS/ROTAS DO SISTEMA
CREATE TABLE IF NOT EXISTS pages (
    id SERIAL PRIMARY KEY,
    route VARCHAR(100) UNIQUE NOT NULL, -- Ex: '/admin/users'
    name VARCHAR(100) NOT NULL, -- Ex: 'Gerenciar Usuários'
    module VARCHAR(50) NOT NULL, -- Ex: 'admin'
    is_active BOOLEAN DEFAULT TRUE,
    icon VARCHAR(50) -- Para menus
);

-- TABELA DE PERMISSÕES (Ações específicas)
CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL, -- Ex: 'users:create'
    is_active BOOLEAN DEFAULT TRUE,
    description TEXT NOT NULL
);

-- RELACIONAMENTO GRUPO-PÁGINA (Quais páginas cada grupo acessa)
CREATE TABLE IF NOT EXISTS group_pages (
    group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
    page_id INTEGER REFERENCES pages(id) ON DELETE CASCADE,
    can_view BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (group_id, page_id)
);

-- RELACIONAMENTO GRUPO-PERMISSÃO (Ações permitidas)
CREATE TABLE IF NOT EXISTS group_permissions (
    group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
    permission_id INTEGER REFERENCES permissions(id) ON DELETE CASCADE,
    can_view BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (group_id, permission_id)
);

-- RELACIONAMENTO USUÁRIO-GRUPO
CREATE TABLE IF NOT EXISTS user_groups (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    group_id INTEGER REFERENCES groups(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, group_id)
);

ALTER TABLE contatos ADD COLUMN responsavel_id INTEGER REFERENCES users(id);
ALTER TABLE group_permissions ADD COLUMN responsavel_id BOOLEAN;
ALTER TABLE group_permissions RENAME COLUMN responsavel_id TO can_view;
