"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionController = void 0;
const transaction_service_1 = require("../services/transaction.service");
class TransactionController {
    static async getAll(request, reply) {
        try {
            const transactions = await transaction_service_1.TransactionService.getAll();
            return reply.send(transactions);
        }
        catch (error) {
            return reply.status(500).send({ error: error.message });
        }
    }
    static async getById(request, reply) {
        try {
            const { id } = request.params;
            const transaction = await transaction_service_1.TransactionService.getById(id);
            return reply.send(transaction);
        }
        catch (error) {
            if (error.message === 'Transação não encontrada') {
                return reply.status(404).send({ error: error.message });
            }
            return reply.status(400).send({ error: error.message });
        }
    }
    static async create(request, reply) {
        try {
            const data = request.body;
            const transaction = await transaction_service_1.TransactionService.create(data);
            return reply.status(201).send(transaction);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
    static async update(request, reply) {
        try {
            const { id } = request.params;
            const data = request.body;
            const transaction = await transaction_service_1.TransactionService.update(id, data);
            return reply.send(transaction);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
    static async patch(request, reply) {
        try {
            const { id } = request.params;
            const data = request.body;
            if (!id || id.trim() === '') {
                return reply.status(400).send({ error: 'ID é obrigatório' });
            }
            if (data.description && data.description.trim() === '') {
                return reply.status(400).send({ error: 'Descrição não pode ser vazia' });
            }
            if (data.type && !['income', 'expense'].includes(data.type)) {
                return reply.status(400).send({ error: 'Tipo deve ser "income" ou "expense"' });
            }
            if (data.amount && data.amount <= 0) {
                return reply.status(400).send({ error: 'Valor deve ser maior que zero' });
            }
            if (data.bankId && data.bankId.trim() === '') {
                return reply.status(400).send({ error: 'ID do banco não pode ser vazio' });
            }
            if (data.categoryId && data.categoryId.trim() === '') {
                return reply.status(400).send({ error: 'ID da categoria não pode ser vazio' });
            }
            const transaction = await transaction_service_1.TransactionService.update(id, data);
            return reply.send(transaction);
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
    static async delete(request, reply) {
        try {
            const { id } = request.params;
            await transaction_service_1.TransactionService.delete(id);
            return reply.status(204).send();
        }
        catch (error) {
            return reply.status(400).send({ error: error.message });
        }
    }
}
exports.TransactionController = TransactionController;
