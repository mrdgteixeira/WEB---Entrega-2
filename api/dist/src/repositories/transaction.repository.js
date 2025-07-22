"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const prisma_1 = require("../../../src/generated/prisma");
class TransactionRepository {
    prisma;
    constructor() {
        this.prisma = new prisma_1.PrismaClient();
    }
    async findAll() {
        return this.prisma.transaction.findMany({
            include: {
                bank: true,
                category: true
            }
        });
    }
    async findById(id) {
        return this.prisma.transaction.findUnique({
            where: { id },
            include: {
                bank: true,
                category: true
            }
        });
    }
    async create(data) {
        return this.prisma.transaction.create({
            data,
            include: {
                bank: true,
                category: true
            }
        });
    }
    async update(id, data) {
        return this.prisma.transaction.update({
            where: { id },
            data,
            include: {
                bank: true,
                category: true
            }
        });
    }
    async delete(id) {
        return this.prisma.transaction.delete({
            where: { id }
        });
    }
    async exists(id) {
        const transaction = await this.prisma.transaction.findUnique({
            where: { id },
            select: { id: true }
        });
        return !!transaction;
    }
    async findByBankId(bankId) {
        return this.prisma.transaction.findMany({
            where: { bankId },
            include: {
                bank: true,
                category: true
            }
        });
    }
    async findByCategoryId(categoryId) {
        return this.prisma.transaction.findMany({
            where: { categoryId },
            include: {
                bank: true,
                category: true
            }
        });
    }
}
exports.TransactionRepository = TransactionRepository;
