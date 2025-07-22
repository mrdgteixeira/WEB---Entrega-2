"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = categoryRoutes;
const category_controller_1 = require("../../controllers/category.controller");
async function categoryRoutes(fastify) {
    fastify.get('/', category_controller_1.CategoryController.getAll);
    fastify.get('/:id', category_controller_1.CategoryController.getById);
    fastify.post('/', category_controller_1.CategoryController.create);
    fastify.patch('/:id', category_controller_1.CategoryController.patch);
    fastify.delete('/:id', category_controller_1.CategoryController.delete);
}
