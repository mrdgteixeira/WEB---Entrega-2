"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = transactionRoutes;
const transaction_controller_1 = require("../../controllers/transaction.controller");
async function transactionRoutes(fastify) {
    fastify.get('/', transaction_controller_1.TransactionController.getAll);
    fastify.get('/:id', transaction_controller_1.TransactionController.getById);
    fastify.post('/', transaction_controller_1.TransactionController.create);
    fastify.patch('/:id', transaction_controller_1.TransactionController.patch);
    fastify.delete('/:id', transaction_controller_1.TransactionController.delete);
}
