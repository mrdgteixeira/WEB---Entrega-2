import { FastifyRequest, FastifyReply } from 'fastify'
import { BankService } from '../services/bank.service'
import { CreateBankDto, UpdateBankDto } from '../entities'
import { BaseController } from './base.controller'

export class BankController extends BaseController {
  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    const controller = new BankController()
    return controller.handleRequest(request, reply, async () => {
      return await BankService.getAll()
    })
  }

  static async getById(request: FastifyRequest, reply: FastifyReply) {
    const controller = new BankController()
    const { id } = request.params as { id: string }
    
    return controller.handleRequest(request, reply, async () => {
      return await BankService.getById(id)
    })
  }

  static async create(request: FastifyRequest, reply: FastifyReply) {
    const controller = new BankController()
    const data = request.body as CreateBankDto
    
    return controller.handleCreateRequest(request, reply, async () => {
      return await BankService.create(data)
    })
  }

  static async update(request: FastifyRequest, reply: FastifyReply) {
    const controller = new BankController()
    const { id } = request.params as { id: string }
    const data = request.body as UpdateBankDto
    
    return controller.handleRequest(request, reply, async () => {
      return await BankService.update(id, data)
    })
  }

  static async patch(request: FastifyRequest, reply: FastifyReply) {
    const controller = new BankController()
    const { id } = request.params as { id: string }
    const data = request.body as UpdateBankDto
    
    return controller.handleRequest(request, reply, async () => {
      return await BankService.update(id, data)
    })
  }

  static async delete(request: FastifyRequest, reply: FastifyReply) {
    const controller = new BankController()
    const { id } = request.params as { id: string }
    
    return controller.handleDeleteRequest(request, reply, async () => {
      return await BankService.delete(id)
    })
  }
}
