import { FastifyRequest, FastifyReply } from 'fastify'
import { CategoryService } from '../services/category.service'

export class CategoryController {
  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const categories = await CategoryService.getAll()
      return reply.send(categories)
    } catch (error: any) {
      return reply.status(500).send({ error: error.message })
    }
  }

  static async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, icon } = request.body as { name: string, icon: string }
      const category = await CategoryService.create(name, icon)
      return reply.status(201).send(category)
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }

  static async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }
      const { name, icon } = request.body as { name: string, icon: string }
      const category = await CategoryService.update(id, name, icon)
      return reply.send(category)
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }

  static async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }
      await CategoryService.delete(id)
      return reply.status(204).send()
    } catch (error: any) {
      return reply.status(400).send({ error: error.message })
    }
  }
}
