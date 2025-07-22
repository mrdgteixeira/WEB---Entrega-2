"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankService = void 0;
const bank_repository_1 = require("../repositories/bank.repository");
const common_1 = require("../common");
const bankRepository = new bank_repository_1.BankRepository();
exports.BankService = {
    getAll: async () => {
        return bankRepository.findAll();
    },
    getById: async (id) => {
        if (!common_1.ValidationHelper.isNotEmpty(id)) {
            throw new common_1.ValidationError('ID é obrigatório');
        }
        const bank = await bankRepository.findById(id);
        if (!bank) {
            throw new common_1.NotFoundError('Banco');
        }
        return bank;
    },
    create: async (data) => {
        if (!common_1.ValidationHelper.isNotEmpty(data.name)) {
            throw new common_1.ValidationError('Nome é obrigatório');
        }
        if (!common_1.ValidationHelper.isNotEmpty(data.ispb)) {
            throw new common_1.ValidationError('ISPB é obrigatório');
        }
        if (!common_1.ValidationHelper.isNotEmpty(data.code)) {
            throw new common_1.ValidationError('Código é obrigatório');
        }
        if (!common_1.ValidationHelper.isNotEmpty(data.fullName)) {
            throw new common_1.ValidationError('Nome completo é obrigatório');
        }
        return bankRepository.create({
            name: data.name.trim(),
            ispb: data.ispb.trim(),
            code: data.code.trim(),
            fullName: data.fullName.trim()
        });
    },
    update: async (id, data) => {
        if (!common_1.ValidationHelper.isNotEmpty(id)) {
            throw new common_1.ValidationError('ID é obrigatório');
        }
        const exists = await bankRepository.exists(id);
        if (!exists) {
            throw new common_1.NotFoundError('Banco');
        }
        const updateData = {};
        if (data.name)
            updateData.name = data.name.trim();
        if (data.ispb)
            updateData.ispb = data.ispb.trim();
        if (data.code)
            updateData.code = data.code.trim();
        if (data.fullName)
            updateData.fullName = data.fullName.trim();
        return bankRepository.update(id, updateData);
    },
    delete: async (id) => {
        if (!common_1.ValidationHelper.isNotEmpty(id)) {
            throw new common_1.ValidationError('ID é obrigatório');
        }
        const exists = await bankRepository.exists(id);
        if (!exists) {
            throw new common_1.NotFoundError('Banco');
        }
        return bankRepository.delete(id);
    },
};
