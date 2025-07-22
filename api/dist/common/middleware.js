"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const common_1 = require("../common");
class ValidationMiddleware {
    static validateUUID(param) {
        return (request, reply, done) => {
            const params = request.params;
            const value = params[param];
            if (!common_1.ValidationHelper.isValidUUID(value)) {
                throw new common_1.ValidationError(`${param} deve ser um UUID válido`);
            }
            done();
        };
    }
    static validateRequired(fields) {
        return (request, reply, done) => {
            const body = request.body;
            for (const field of fields) {
                if (!body[field] || !common_1.ValidationHelper.isNotEmpty(String(body[field]))) {
                    throw new common_1.ValidationError(`${field} é obrigatório`);
                }
            }
            done();
        };
    }
    static validateBankData() {
        return (request, reply, done) => {
            const { name } = request.body;
            if (!common_1.ValidationHelper.isNotEmpty(name)) {
                throw new common_1.ValidationError('Nome é obrigatório');
            }
            if (name.length < 2) {
                throw new common_1.ValidationError('Nome deve ter pelo menos 2 caracteres');
            }
            if (name.length > 100) {
                throw new common_1.ValidationError('Nome deve ter no máximo 100 caracteres');
            }
            done();
        };
    }
    static validateCategoryData() {
        return (request, reply, done) => {
            const { name, icon } = request.body;
            if (!common_1.ValidationHelper.isNotEmpty(name)) {
                throw new common_1.ValidationError('Nome é obrigatório');
            }
            if (!common_1.ValidationHelper.isNotEmpty(icon)) {
                throw new common_1.ValidationError('Ícone é obrigatório');
            }
            if (name.length < 2 || name.length > 50) {
                throw new common_1.ValidationError('Nome deve ter entre 2 e 50 caracteres');
            }
            done();
        };
    }
    static validateTransactionData() {
        return (request, reply, done) => {
            const { description, type, amount, bankId, categoryId, date } = request.body;
            if (!common_1.ValidationHelper.isNotEmpty(description)) {
                throw new common_1.ValidationError('Descrição é obrigatória');
            }
            if (!['income', 'expense'].includes(type)) {
                throw new common_1.ValidationError('Tipo deve ser "income" ou "expense"');
            }
            if (!common_1.ValidationHelper.isPositiveNumber(amount)) {
                throw new common_1.ValidationError('Valor deve ser maior que zero');
            }
            if (!common_1.ValidationHelper.isValidUUID(bankId)) {
                throw new common_1.ValidationError('ID do banco inválido');
            }
            if (!common_1.ValidationHelper.isValidUUID(categoryId)) {
                throw new common_1.ValidationError('ID da categoria inválido');
            }
            if (!common_1.ValidationHelper.isValidDate(new Date(date))) {
                throw new common_1.ValidationError('Data inválida');
            }
            done();
        };
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
