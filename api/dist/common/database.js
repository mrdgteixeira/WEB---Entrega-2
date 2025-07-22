"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnection = void 0;
const generated_1 = require("../../prisma/generated");
class DatabaseConnection {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = new generated_1.PrismaClient({
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
