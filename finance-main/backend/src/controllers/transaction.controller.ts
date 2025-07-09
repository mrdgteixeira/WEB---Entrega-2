import { FastifyRequest, FastifyReply } from 'fastify'
import { TransactionService } from '../services/transaction.service'

export class TransactionController {
  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const transactions = await TransactionService.getAll()
      return reply.send(transactions)
    } catch (error: any) {
      return reply.status(500).send({ error: error.message })
    }
  }

  static async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = request.body
      const transaction = await TransactionService.create(data)
      return reply.status(201).send(transaction)
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }

  static async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }
      const data = request.body
      const transaction = await TransactionService.update(id, data)
      return reply.send(transaction)
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }

  static async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }
      await TransactionService.delete(id)
      return reply.status(204).send()
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }
}
