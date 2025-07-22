import { FastifyInstance } from 'fastify'
import { CategoryController } from '../../controllers/category.controller'

export async function categoryRoutes(fastify: FastifyInstance) {
  fastify.get('/', CategoryController.getAll)

  fastify.post('/', CategoryController.create)

  fastify.patch('/:id', CategoryController.patch)

  fastify.delete('/:id', CategoryController.delete)
}