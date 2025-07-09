import { FastifyInstance } from 'fastify'
import { BankController } from '../../controllers/bank.controller'

export async function bankRoutes(fastify: FastifyInstance) {
  fastify.get('/', BankController.getAll)

  fastify.post('/', BankController.create)

  fastify.delete('/:id', BankController.delete)
}