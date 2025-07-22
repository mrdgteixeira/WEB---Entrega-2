import { FastifyInstance } from 'fastify'
import { BankController } from '../../controllers/bank.controller'
import { ValidationMiddleware } from '../../common'

export async function bankRoutes(fastify: FastifyInstance) {
  fastify.get('/', BankController.getAll)

  fastify.get('/:id', {
    preHandler: ValidationMiddleware.validateUUID('id')
  }, BankController.getById)

  fastify.post('/', {
    preHandler: ValidationMiddleware.validateBankData()
  }, BankController.create)

  fastify.patch('/:id', {
    preHandler: [
      ValidationMiddleware.validateUUID('id'),
      ValidationMiddleware.validateBankUpdateData()
    ]
  }, BankController.patch)

  fastify.delete('/:id', {
    preHandler: ValidationMiddleware.validateUUID('id')
  }, BankController.delete)
}