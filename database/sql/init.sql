-- criação de tabelas

CREATE TABLE IF NOT EXISTS contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL,
    assunto VARCHAR(30) NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
