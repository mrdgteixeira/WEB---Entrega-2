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

  static async getById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }
      const transaction = await TransactionService.getById(id)
      return reply.send(transaction)
    } catch (error: any) {
      if (error.message === 'Transação não encontrada') {
        return reply.status(404).send({ error: error.message })
      }
      return reply.status(400).send({ error: error.message })
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
      const data = request.body as any
      const transaction = await TransactionService.update(id, data)
      return reply.send(transaction)
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }

  static async patch(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }
      const data = request.body as any
      
      if (!id || id.trim() === '') {
        return reply.status(400).send({ error: 'ID é obrigatório' })
      }
      if (data.description && data.description.trim() === '') {
        return reply.status(400).send({ error: 'Descrição não pode ser vazia' })
      }
      if (data.type && !['income', 'expense'].includes(data.type)) {
        return reply.status(400).send({ error: 'Tipo deve ser "income" ou "expense"' })
      }
      if (data.amount && data.amount <= 0) {
        return reply.status(400).send({ error: 'Valor deve ser maior que zero' })
      }
      if (data.bankId && data.bankId.trim() === '') {
        return reply.status(400).send({ error: 'ID do banco não pode ser vazio' })
      }
      if (data.categoryId && data.categoryId.trim() === '') {
        return reply.status(400).send({ error: 'ID da categoria não pode ser vazio' })
      }
      
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
