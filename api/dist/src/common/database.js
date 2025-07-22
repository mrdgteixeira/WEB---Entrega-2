"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const prisma_1 = require("../../../src/generated/prisma");
class DatabaseConnection {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new prisma_1.PrismaClient({
                log: ['error', 'warn'],
                errorFormat: 'minimal'
            });
        }
        return this.instance;
    }
    static async disconnect() {
        if (this.instance) {
            await this.instance.$disconnect();
        }
    }
}
exports.DatabaseConnection = DatabaseConnection;
