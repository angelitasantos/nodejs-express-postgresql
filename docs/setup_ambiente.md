# 📚 Configuração do Ambiente Local

Este documento descreve os passos para configurar o ambiente de desenvolvimento local do projeto.

---

## 🚀 Requisitos

- Node.js (versão 18+ recomendada)
- npm (v9+)
- Git
- Editor de código (VS Code recomendado)
- PostgreSQL

---

## 🔧 Instalação

#### Clone o repositório
```bash
git clone https://github.com/angelitasantos/nodejs-express-postgresql.git
```
```bash
cd nodejs-express-postgresql
```

#### Instale as dependências
```bash
npm install
```

---

## 📂 Estrutura de Pastas

Ver arquivo docs/estrutura.txt

---

## 🔀 Variáveis de Ambiente

Crie um arquivo .env com o seguinte:
- PORT=3000
- SECRET_KEY=sua-chave-jwt

---

## 📃 Scripts Disponíveis

#### Iniciar o servidor em desenvolvimento
```bash
npm run dev
```
