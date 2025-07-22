import { FastifyInstance } from 'fastify'
import { CategoryController } from '../../controllers/category.controller'
import { ValidationMiddleware } from '../../common'

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.get('/', CategoryController.getAll)

  fastify.get('/:id', {
    preHandler: ValidationMiddleware.validateUUID('id')
  }, CategoryController.getById)

  fastify.post('/', {
    preHandler: ValidationMiddleware.validateCategoryData()
  }, CategoryController.create)

  fastify.patch('/:id', {
    preHandler: [
      ValidationMiddleware.validateUUID('id'),
      ValidationMiddleware.validateCategoryUpdateData()
    ]
  }, CategoryController.patch)

  fastify.delete('/:id', {
    preHandler: ValidationMiddleware.validateUUID('id')
  }, CategoryController.delete)
}