import { FastifyInstance } from 'fastify'
import { TransactionController } from '../../controllers/transaction.controller'

export async function transactionRoutes(fastify: FastifyInstance) {
  fastify.get('/', TransactionController.getAll)

  fastify.post('/', TransactionController.create)

  fastify.patch('/:id', TransactionController.patch)

  fastify.delete('/:id', TransactionController.delete)
}
