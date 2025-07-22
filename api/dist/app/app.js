"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const route_1 = require("../routes/banks/route");
const route_2 = require("../routes/categories/route");
const route_3 = require("../routes/transactions/route");
async function buildApp() {
    const app = (0, fastify_1.default)({
        logger: process.env.NODE_ENV !== 'production'
    });
    await app.register(cors_1.default, {
        origin: process.env.NODE_ENV === 'production'
            ? ['http://localhost:3000', 'http://localhost:3001']
            : '*',
        credentials: true
    });
    app.get('/health', async (request, reply) => {
        return { status: 'ok', timestamp: new Date().toISOString() };
    });
    app.register(route_1.bankRoutes, { prefix: '/api/banks' });
    app.register(route_2.categoryRoutes, { prefix: '/api/categories' });
    app.register(route_3.transactionRoutes, { prefix: '/api/transactions' });
    app.setErrorHandler(async (error, request, reply) => {
        app.log.error(error);
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Erro interno do servidor';
        return reply.status(statusCode).send({
            error: message,
            statusCode,
            timestamp: new Date().toISOString()
        });
    });
    return app;
}
exports.default = buildApp;
