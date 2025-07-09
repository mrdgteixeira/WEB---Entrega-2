import { FastifyInstance } from 'fastify'
import { TransactionController } from '../../controllers/transaction.controller'

export async function transactionRoutes(fastify: FastifyInstance) {
  fastify.get('/', TransactionController.getAll)

  fastify.post('/', TransactionController.create)

  fastify.delete('/:id', TransactionController.delete)
}
