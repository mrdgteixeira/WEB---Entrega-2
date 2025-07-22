"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_repository_1 = require("../repositories/category.repository");
const common_1 = require("../common");
const categoryRepository = new category_repository_1.CategoryRepository();
exports.CategoryService = {
    getAll: async () => {
        return categoryRepository.findAll();
    },
    getById: async (id) => {
        if (!common_1.ValidationHelper.isNotEmpty(id)) {
            throw new common_1.ValidationError('ID é obrigatório');
        }
        const category = await categoryRepository.findById(id);
        if (!category) {
            throw new common_1.NotFoundError('Categoria');
        }
        return category;
    },
    create: async (data) => {
        if (!common_1.ValidationHelper.isNotEmpty(data.name)) {
            throw new common_1.ValidationError('Nome é obrigatório');
        }
        return categoryRepository.create({
            name: data.name.trim(),
            icon: data.icon?.trim()
        });
    },
    update: async (id, data) => {
        if (!common_1.ValidationHelper.isNotEmpty(id)) {
            throw new common_1.ValidationError('ID é obrigatório');
        }
        const exists = await categoryRepository.exists(id);
        if (!exists) {
            throw new common_1.NotFoundError('Categoria');
        }
        const updateData = {};
        if (data.name && common_1.ValidationHelper.isNotEmpty(data.name)) {
            updateData.name = data.name.trim();
        }
        if (data.icon && common_1.ValidationHelper.isNotEmpty(data.icon)) {
            updateData.icon = data.icon.trim();
        }
        return categoryRepository.update(id, updateData);
    },
    delete: async (id) => {
        if (!common_1.ValidationHelper.isNotEmpty(id)) {
            throw new common_1.ValidationError('ID é obrigatório');
        }
        const exists = await categoryRepository.exists(id);
        if (!exists) {
            throw new common_1.NotFoundError('Categoria');
        }
        return categoryRepository.delete(id);
    },
};
