"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankRoutes = bankRoutes;
const bank_controller_1 = require("../../controllers/bank.controller");
const common_1 = require("../../common");
async function bankRoutes(fastify) {
    fastify.get('/', bank_controller_1.BankController.getAll);
    fastify.get('/:id', {
        preHandler: common_1.ValidationMiddleware.validateUUID('id')
    }, bank_controller_1.BankController.getById);
    fastify.post('/', {
        preHandler: common_1.ValidationMiddleware.validateBankData()
    }, bank_controller_1.BankController.create);
    fastify.patch('/:id', {
        preHandler: [
            common_1.ValidationMiddleware.validateUUID('id'),
            common_1.ValidationMiddleware.validateBankData()
        ]
    }, bank_controller_1.BankController.patch);
    fastify.delete('/:id', {
        preHandler: common_1.ValidationMiddleware.validateUUID('id')
    }, bank_controller_1.BankController.delete);
}
