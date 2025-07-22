"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const prisma_1 = require("../../../src/generated/prisma");
class CategoryRepository {
    prisma;
    constructor() {
        this.prisma = new prisma_1.PrismaClient();
    }
    async findAll() {
        return this.prisma.category.findMany();
    }
    async findById(id) {
        return this.prisma.category.findUnique({
            where: { id }
        });
    }
    async create(data) {
        return this.prisma.category.create({
            data
        });
    }
    async update(id, data) {
        return this.prisma.category.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        return this.prisma.category.delete({
            where: { id }
        });
    }
    async exists(id) {
        const category = await this.prisma.category.findUnique({
            where: { id },
            select: { id: true }
        });
        return !!category;
    }
}
exports.CategoryRepository = CategoryRepository;
