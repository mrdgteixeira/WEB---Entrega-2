"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankRepository = void 0;
const base_repository_1 = require("./base.repository");
class BankRepository extends base_repository_1.BaseRepository {
    async findAll() {
        try {
            return await this.prisma.bank.findMany({
                orderBy: { name: 'asc' }
            });
        }
        catch (error) {
            return this.handleError(error, 'findAll banks');
        }
    }
    async findById(id) {
        try {
            return await this.prisma.bank.findUnique({
                where: { id }
            });
        }
        catch (error) {
            return this.handleError(error, 'findById bank');
        }
    }
    async create(data) {
        try {
            return await this.prisma.bank.create({
                data
            });
        }
        catch (error) {
            return this.handleError(error, 'create bank');
        }
    }
    async update(id, data) {
        try {
            return await this.prisma.bank.update({
                where: { id },
                data
            });
        }
        catch (error) {
            return this.handleError(error, 'update bank');
        }
    }
    async delete(id) {
        try {
            return await this.prisma.bank.delete({
                where: { id }
            });
        }
        catch (error) {
            return this.handleError(error, 'delete bank');
        }
    }
    async exists(id) {
        try {
            const count = await this.prisma.bank.count({
                where: { id }
            });
            return count > 0;
        }
        catch (error) {
            return this.handleError(error, 'check bank exists');
        }
    }
    async findByName(name) {
        try {
            return await this.prisma.bank.findMany({
                where: {
                    name: {
                        contains: name
                    }
                }
            });
        }
        catch (error) {
            return this.handleError(error, 'findByName bank');
        }
    }
}
exports.BankRepository = BankRepository;
