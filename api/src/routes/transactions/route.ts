import { FastifyInstance } from 'fastify'
import { TransactionController } from '../../controllers/transaction.controller'
import { ValidationMiddleware } from '../../common'

export async function transactionRoutes(fastify: FastifyInstance) {
  fastify.get('/', TransactionController.getAll)

  fastify.get('/:id', {
    preHandler: ValidationMiddleware.validateUUID('id')
  }, TransactionController.getById)

  fastify.post('/', {
    preHandler: ValidationMiddleware.validateTransactionData()
  }, TransactionController.create)

  fastify.patch('/:id', {
    preHandler: [
      ValidationMiddleware.validateUUID('id'),
      ValidationMiddleware.validateTransactionUpdateData()
    ]
  }, TransactionController.patch)

  fastify.delete('/:id', {
    preHandler: ValidationMiddleware.validateUUID('id')
  }, TransactionController.delete)
}
