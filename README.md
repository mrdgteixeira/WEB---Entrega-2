# Sistema de Gestão Financeira

Um sistema completo de gestão financeira com API backend e interface web frontend.

## 📁 Estrutura do Projeto

```
finance-main/
├── backend/            # Backend API (Fastify + TypeScript)
├── client/             # Frontend Web (Next.js + TypeScript)
├── database/           # Esquemas e configurações do banco (Prisma)
├── docs/               # Documentação do projeto
├── generated/          # Arquivos gerados automaticamente (Prisma Client)
├── .env               # Variáveis de ambiente
├── .gitignore         # Arquivos ignorados pelo Git
└── README.md          # Este arquivo
```

## 🚀 Tecnologias Utilizadas

### Backend (API)
- **Fastify** - Framework web rápido e eficiente
- **TypeScript** - Tipagem estática para JavaScript
- **Prisma** - ORM para banco de dados
- **SQLite** - Banco de dados local

### Frontend (Client)
- **Next.js** - Framework React para produção
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **React** - Biblioteca para interfaces de usuário

## 🛠️ Instalação e Configuração

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### 1. Configuração do Backend (API)
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### 2. Configuração do Frontend (Client)
```bash
cd client
npm install
npm run dev
```

## 📚 Documentação da API

### Endpoints Disponíveis

#### Health Check
- `GET /health` - Status do servidor

#### Bancos (`/api/banks`)
- `GET /api/banks` - Lista todos os bancos
- `GET /api/banks/:id` - Busca um banco específico
- `POST /api/banks` - Cria um novo banco
- `PATCH /api/banks/:id` - Atualiza um banco específico
- `DELETE /api/banks/:id` - Remove um banco

#### Categorias (`/api/categories`)
- `GET /api/categories` - Lista todas as categorias
- `GET /api/categories/:id` - Busca uma categoria específica
- `POST /api/categories` - Cria uma nova categoria
- `PATCH /api/categories/:id` - Atualiza uma categoria específica
- `DELETE /api/categories/:id` - Remove uma categoria

#### Transações (`/api/transactions`)
- `GET /api/transactions` - Lista todas as transações
- `GET /api/transactions/:id` - Busca uma transação específica
- `POST /api/transactions` - Cria uma nova transação
- `PATCH /api/transactions/:id` - Atualiza uma transação específica
- `DELETE /api/transactions/:id` - Remove uma transação

## 🗄️ Modelo do Banco de Dados

### Entidades
- **Bank**: Gerencia informações dos bancos
- **Category**: Categorias para classificação de transações
- **Transaction**: Registros de transações financeiras

### Relacionamentos
- Uma transação pertence a um banco
- Uma transação pertence a uma categoria
- Um banco pode ter várias transações
- Uma categoria pode ter várias transações

## 🧪 Testes

Use o Insomnia ou Postman para testar a API:
- Importe os endpoints para seu cliente de API favorito
- Configure a base URL: `http://localhost:3333`
- Teste todos os endpoints CRUD
- Health check disponível em: `http://localhost:3333/health`

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📧 Contato

Para dúvidas ou sugestões, entre em contato através do GitHub.
