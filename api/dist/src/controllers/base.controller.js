"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const common_1 = require("../common");
class BaseController {
    async handleRequest(request, reply, operation) {
        try {
            const result = await operation();
            return reply.status(common_1.HTTP_STATUS.OK).send(result);
        }
        catch (error) {
            return this.handleError(error, reply);
        }
    }
    async handleCreateRequest(request, reply, operation) {
        try {
            const result = await operation();
            return reply.status(common_1.HTTP_STATUS.CREATED).send(result);
        }
        catch (error) {
            return this.handleError(error, reply);
        }
    }
    async handleDeleteRequest(request, reply, operation) {
        try {
            await operation();
            return reply.status(common_1.HTTP_STATUS.NO_CONTENT).send();
        }
        catch (error) {
            return this.handleError(error, reply);
        }
    }
    handleError(error, reply) {
        console.error('Controller Error:', error);
        if (error instanceof common_1.ValidationError) {
            return reply.status(common_1.HTTP_STATUS.BAD_REQUEST).send({
                error: error.message,
                type: 'validation_error'
            });
        }
        if (error instanceof common_1.NotFoundError) {
            return reply.status(common_1.HTTP_STATUS.NOT_FOUND).send({
                error: error.message,
                type: 'not_found_error'
            });
        }
        if (error instanceof common_1.AppError) {
            return reply.status(error.statusCode).send({
                error: error.message,
                type: 'app_error'
            });
        }
        return reply.status(common_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
            error: 'Erro interno do servidor',
            type: 'internal_server_error'
        });
    }
}
exports.BaseController = BaseController;
