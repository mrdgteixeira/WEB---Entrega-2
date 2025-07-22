"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const prisma_1 = require("../../../src/generated/prisma");
const prisma = new prisma_1.PrismaClient();
exports.TransactionService = {
    getAll: async () => prisma.transaction.findMany({ include: { bank: true, category: true } }),
    getById: async (id) => {
        if (!id || id.trim() === '') {
            throw new Error('ID é obrigatório');
        }
        const transaction = await prisma.transaction.findUnique({
            where: { id },
            include: { bank: true, category: true }
        });
        if (!transaction) {
            throw new Error('Transação não encontrada');
        }
        return transaction;
    },
    create: async (data) => {
        if (!data.description || data.description.trim() === '') {
            throw new Error('Descrição é obrigatória');
        }
        if (!data.type || !['income', 'expense'].includes(data.type)) {
            throw new Error('Tipo deve ser "income" ou "expense"');
        }
        if (!data.amount || data.amount <= 0) {
            throw new Error('Valor deve ser maior que zero');
        }
        if (!data.bankId || data.bankId.trim() === '') {
            throw new Error('ID do banco é obrigatório');
        }
        if (!data.categoryId || data.categoryId.trim() === '') {
            throw new Error('ID da categoria é obrigatório');
        }
        if (!data.date) {
            throw new Error('Data é obrigatória');
        }
        return prisma.transaction.create({ data });
    },
    update: async (id, data) => {
        if (!id || id.trim() === '') {
            throw new Error('ID é obrigatório');
        }
        if (data.description && data.description.trim() === '') {
            throw new Error('Descrição não pode ser vazia');
        }
        if (data.type && !['income', 'expense'].includes(data.type)) {
            throw new Error('Tipo deve ser "income" ou "expense"');
        }
        if (data.amount && data.amount <= 0) {
            throw new Error('Valor deve ser maior que zero');
        }
        if (data.bankId && data.bankId.trim() === '') {
            throw new Error('ID do banco não pode ser vazio');
        }
        if (data.categoryId && data.categoryId.trim() === '') {
            throw new Error('ID da categoria não pode ser vazio');
        }
        return prisma.transaction.update({ where: { id }, data });
    },
    delete: async (id) => {
        if (!id || id.trim() === '') {
            throw new Error('ID é obrigatório');
        }
        return prisma.transaction.delete({ where: { id } });
    },
};
