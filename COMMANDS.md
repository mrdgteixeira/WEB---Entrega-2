# Finance Management System - Commands

Este arquivo contém os comandos mais utilizados no projeto.

## Setup Inicial

```bash
# Instalar todas as dependências
npm run install:all

# Configurar banco de dados
npm run setup
```

## Desenvolvimento

```bash
# Executar API e Client simultaneamente
npm run dev

# Executar apenas a API
npm run dev:api

# Executar apenas o Client
npm run dev:client
```

## Banco de Dados

```bash
# Gerar Prisma Client
cd api && npm run db:generate

# Sincronizar schema com banco
cd api && npm run db:push

# Criar nova migração
cd api && npm run db:migrate
```

## Build e Deploy

```bash
# Build completo
npm run build

# Build apenas API
npm run build:api

# Build apenas Client
npm run build:client
```

## URLs

- **API Backend**: http://localhost:3000
- **Client Frontend**: http://localhost:3001

## Endpoints da API

### Bancos
- GET /banks - Listar bancos
- POST /banks - Criar banco
- PATCH /banks/:id - Atualizar banco
- DELETE /banks/:id - Excluir banco

### Categorias
- GET /categories - Listar categorias
- POST /categories - Criar categoria
- PATCH /categories/:id - Atualizar categoria
- DELETE /categories/:id - Excluir categoria

### Transações
- GET /transactions - Listar transações
- POST /transactions - Criar transação
- PATCH /transactions/:id - Atualizar transação
- DELETE /transactions/:id - Excluir transação
