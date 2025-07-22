import { FastifyRequest, FastifyReply } from 'fastify'
import { TransactionService } from '../services/transaction.service'
import { CreateTransactionDto, UpdateTransactionDto } from '../entities'
import { BaseController } from './base.controller'

export class TransactionController extends BaseController {
  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    const controller = new TransactionController()
    return controller.handleRequest(request, reply, async () => {
      return await TransactionService.getAll()
    })
  }

  static async getById(request: FastifyRequest, reply: FastifyReply) {
    const controller = new TransactionController()
    const { id } = request.params as { id: string }
    
    return controller.handleRequest(request, reply, async () => {
      return await TransactionService.getById(id)
    })
  }

  static async create(request: FastifyRequest, reply: FastifyReply) {
    const controller = new TransactionController()
    const data = request.body as CreateTransactionDto
    
    return controller.handleCreateRequest(request, reply, async () => {
      return await TransactionService.create(data)
    })
  }

  static async update(request: FastifyRequest, reply: FastifyReply) {
    const controller = new TransactionController()
    const { id } = request.params as { id: string }
    const data = request.body as UpdateTransactionDto
    
    return controller.handleRequest(request, reply, async () => {
      return await TransactionService.update(id, data)
    })
  }

  static async patch(request: FastifyRequest, reply: FastifyReply) {
    return TransactionController.update(request, reply)
  }

  static async delete(request: FastifyRequest, reply: FastifyReply) {
    const controller = new TransactionController()
    const { id } = request.params as { id: string }
    
    return controller.handleRequest(request, reply, async () => {
      await TransactionService.delete(id)
      return { message: 'Transação removida com sucesso' }
    })
  }
}