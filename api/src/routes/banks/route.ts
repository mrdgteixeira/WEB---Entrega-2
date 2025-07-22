import { FastifyInstance } from 'fastify'
import { BankController } from '../../controllers/bank.controller'
import { ValidationMiddleware } from '../../common'

export async function bankRoutes(fastify: FastifyInstance) {
  // GET /banks - Listar todos os bancos
  fastify.get('/', BankController.getAll)

  // GET /banks/:id - Buscar banco por ID
  fastify.get('/:id', {
    preHandler: ValidationMiddleware.validateUUID('id')
  }, BankController.getById)

  // POST /banks - Criar novo banco
  fastify.post('/', {
    preHandler: ValidationMiddleware.validateBankData()
  }, BankController.create)

  // PATCH /banks/:id - Atualizar banco
  fastify.patch('/:id', {
    preHandler: [
      ValidationMiddleware.validateUUID('id'),
      ValidationMiddleware.validateBankData()
    ]
  }, BankController.patch)

  // DELETE /banks/:id - Remover banco
  fastify.delete('/:id', {
    preHandler: ValidationMiddleware.validateUUID('id')
  }, BankController.delete)
}