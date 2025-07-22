import { FastifyRequest, FastifyReply } from 'fastify'
import { CategoryService } from '../services/category.service'
import { CreateCategoryDto, UpdateCategoryDto } from '../entities'
import { BaseController } from './base.controller'

export class CategoryController extends BaseController {
  static async getAll(request: FastifyRequest, reply: FastifyReply) {
    const controller = new CategoryController()
    return controller.handleRequest(request, reply, async () => {
      return await CategoryService.getAll()
    })
  }

  static async getById(request: FastifyRequest, reply: FastifyReply) {
    const controller = new CategoryController()
    const { id } = request.params as { id: string }
    
    return controller.handleRequest(request, reply, async () => {
      return await CategoryService.getById(id)
    })
  }

  static async create(request: FastifyRequest, reply: FastifyReply) {
    const controller = new CategoryController()
    const data = request.body as CreateCategoryDto
    
    return controller.handleCreateRequest(request, reply, async () => {
      return await CategoryService.create(data)
    })
  }

  static async update(request: FastifyRequest, reply: FastifyReply) {
    const controller = new CategoryController()
    const { id } = request.params as { id: string }
    const data = request.body as UpdateCategoryDto
    
    return controller.handleRequest(request, reply, async () => {
      return await CategoryService.update(id, data)
    })
  }

  static async patch(request: FastifyRequest, reply: FastifyReply) {
    const controller = new CategoryController()
    const { id } = request.params as { id: string }
    const data = request.body as UpdateCategoryDto
    
    return controller.handleRequest(request, reply, async () => {
      return await CategoryService.update(id, data)
    })
  }

  static async delete(request: FastifyRequest, reply: FastifyReply) {
    const controller = new CategoryController()
    const { id } = request.params as { id: string }
    
    return controller.handleDeleteRequest(request, reply, async () => {
      return await CategoryService.delete(id)
    })
  }
}
