import { FastifyInstance } from 'fastify'
import { BankController } from '../../controllers/bank.controller'

export async function bankRoutes(fastify: FastifyInstance) {
  fastify.get('/', BankController.getAll)

  fastify.get('/:id', BankController.getById)

  fastify.post('/', BankController.create)

  fastify.patch('/:id', BankController.patch)

  fastify.delete('/:id', BankController.delete)
}