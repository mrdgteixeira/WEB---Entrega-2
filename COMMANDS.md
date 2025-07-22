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

- **API Backend**: http://localhost:3333
- **Client Frontend**: http://localhost:3000
- **Health Check**: http://localhost:3333/health

## Endpoints da API

### Health Check
- GET /health - Status do servidor

### Bancos
- GET /api/banks - Listar bancos
- GET /api/banks/:id - Buscar banco específico
- POST /api/banks - Criar banco
- PATCH /api/banks/:id - Atualizar banco
- DELETE /api/banks/:id - Excluir banco

### Categorias
- GET /api/categories - Listar categorias
- GET /api/categories/:id - Buscar categoria específica
- POST /api/categories - Criar categoria
- PATCH /api/categories/:id - Atualizar categoria
- DELETE /api/categories/:id - Excluir categoria

### Transações
- GET /api/transactions - Listar transações
- GET /api/transactions/:id - Buscar transação específica
- POST /api/transactions - Criar transação
- PATCH /api/transactions/:id - Atualizar transação
- DELETE /api/transactions/:id - Excluir transação
