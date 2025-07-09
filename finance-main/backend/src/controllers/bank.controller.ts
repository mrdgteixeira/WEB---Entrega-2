import { FastifyRequest, FastifyReply } from 'fastify'
import { BankService } from '../services/bank.service'

export class BankController {
  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const banks = await BankService.getAll()
      return reply.send(banks)
    } catch (error: any) {
      return reply.status(500).send({ error: error.message })
    }
  }

  static async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name } = request.body as { name: string }
      const bank = await BankService.create(name)
      return reply.status(201).send(bank)
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }

  static async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }
      const { name } = request.body as { name: string }
      const bank = await BankService.update(id, name)
      return reply.send(bank)
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }

  static async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }
      await BankService.delete(id)
      return reply.status(204).send()
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }
}
