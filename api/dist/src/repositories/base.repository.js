"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const common_1 = require("../common");
class BaseRepository {
    prisma;
    constructor() {
        this.prisma = common_1.DatabaseConnection.getInstance();
    }
    async handleError(error, operation) {
        console.error(`Database error in ${operation}:`, error);
        if (error.code === 'P2002') {
            throw new Error('Registro já existe');
        }
        if (error.code === 'P2025') {
            throw new Error('Registro não encontrado');
        }
        throw new Error(`Erro na operação: ${operation}`);
    }
}
exports.BaseRepository = BaseRepository;
