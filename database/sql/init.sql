-- criação de tabelas

CREATE TABLE IF NOT EXISTS contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    assunto VARCHAR(30) NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    cargo VARCHAR(50) NOT NULL DEFAULT 'atendente',
    grupo VARCHAR(50) NOT NULL DEFAULT 'OPERACIONAL',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE contatos ADD COLUMN responsavel_id INTEGER REFERENCES usuarios(id);

-- Adicione um usuário de teste (senha: 123456)
INSERT INTO usuarios (nome, email, senha_hash, cargo)
VALUES (
    'Admin Teste',
    'admin@teste.com',
    '$2b$10$G.KO5qJfEy5NYH4b2H3nKu7J7RfMb5P2VZ.Yn7CwfJQ7hQ5d6O6mK', -- Hash de '123456'
    'admin'
);
