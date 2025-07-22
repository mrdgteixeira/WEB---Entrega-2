"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_MESSAGES = exports.DEFAULT_PAGINATION = exports.TRANSACTION_TYPES = exports.HTTP_STATUS = void 0;
exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
};
exports.TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense'
};
exports.DEFAULT_PAGINATION = {
    PAGE: 1,
    LIMIT: 10,
    MAX_LIMIT: 100
};
exports.VALIDATION_MESSAGES = {
    REQUIRED_FIELD: (field) => `${field} é obrigatório`,
    INVALID_FORMAT: (field) => `${field} tem formato inválido`,
    NOT_FOUND: (resource) => `${resource} não encontrado`,
    ALREADY_EXISTS: (resource) => `${resource} já existe`
};
