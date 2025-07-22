"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankController = void 0;
const bank_service_1 = require("../services/bank.service");
const base_controller_1 = require("./base.controller");
class BankController extends base_controller_1.BaseController {
    static async getAll(request, reply) {
        const controller = new BankController();
        return controller.handleRequest(request, reply, async () => {
            return await bank_service_1.BankService.getAll();
        });
    }
    static async getById(request, reply) {
        const controller = new BankController();
        const { id } = request.params;
        return controller.handleRequest(request, reply, async () => {
            return await bank_service_1.BankService.getById(id);
        });
    }
    static async create(request, reply) {
        const controller = new BankController();
        const data = request.body;
        return controller.handleCreateRequest(request, reply, async () => {
            return await bank_service_1.BankService.create(data);
        });
    }
    static async update(request, reply) {
        const controller = new BankController();
        const { id } = request.params;
        const data = request.body;
        return controller.handleRequest(request, reply, async () => {
            return await bank_service_1.BankService.update(id, data);
        });
    }
    static async patch(request, reply) {
        const controller = new BankController();
        const { id } = request.params;
        const data = request.body;
        return controller.handleRequest(request, reply, async () => {
            return await bank_service_1.BankService.update(id, data);
        });
    }
    static async delete(request, reply) {
        const controller = new BankController();
        const { id } = request.params;
        return controller.handleDeleteRequest(request, reply, async () => {
            return await bank_service_1.BankService.delete(id);
        });
    }
}
exports.BankController = BankController;
