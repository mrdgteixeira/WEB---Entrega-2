import { PrismaClient } from '../../../generated/prisma'

export class CategoryRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async findAll() {
    return this.prisma.category.findMany()
  }

  async findById(id: string) {
    return this.prisma.category.findUnique({ 
      where: { id } 
    })
  }

  async create(data: { name: string; icon: string }) {
    return this.prisma.category.create({ 
      data 
    })
  }

  async update(id: string, data: { name: string; icon: string }) {
    return this.prisma.category.update({ 
      where: { id }, 
      data 
    })
  }

  async delete(id: string) {
    return this.prisma.category.delete({ 
      where: { id } 
    })
  }

  async exists(id: string): Promise<boolean> {
    const category = await this.prisma.category.findUnique({ 
      where: { id },
      select: { id: true }
    })
    return !!category
  }
}
