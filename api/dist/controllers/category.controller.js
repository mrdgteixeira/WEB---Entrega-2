"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("../services/category.service");
const base_controller_1 = require("./base.controller");
class CategoryController extends base_controller_1.BaseController {
    static async getAll(request, reply) {
        const controller = new CategoryController();
        return controller.handleRequest(request, reply, async () => {
            return await category_service_1.CategoryService.getAll();
        });
    }
    static async getById(request, reply) {
        const controller = new CategoryController();
        const { id } = request.params;
        return controller.handleRequest(request, reply, async () => {
            return await category_service_1.CategoryService.getById(id);
        });
    }
    static async create(request, reply) {
        const controller = new CategoryController();
        const data = request.body;
        return controller.handleCreateRequest(request, reply, async () => {
            return await category_service_1.CategoryService.create(data);
        });
    }
    static async update(request, reply) {
        const controller = new CategoryController();
        const { id } = request.params;
        const data = request.body;
        return controller.handleRequest(request, reply, async () => {
            return await category_service_1.CategoryService.update(id, data);
        });
    }
    static async patch(request, reply) {
        const controller = new CategoryController();
        const { id } = request.params;
        const data = request.body;
        return controller.handleRequest(request, reply, async () => {
            return await category_service_1.CategoryService.update(id, data);
        });
    }
    static async delete(request, reply) {
        const controller = new CategoryController();
        const { id } = request.params;
        return controller.handleDeleteRequest(request, reply, async () => {
            return await category_service_1.CategoryService.delete(id);
        });
    }
}
exports.CategoryController = CategoryController;
