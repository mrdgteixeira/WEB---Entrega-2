import { PrismaClient } from '../../../generated/prisma'
const prisma = new PrismaClient()

export const CategoryService = {
  getAll: async () => prisma.category.findMany(),
  create: async (name: string, icon: string) => {
    if (!name || name.trim() === '') {
      throw new Error('Nome é obrigatório')
    }
    if (!icon || icon.trim() === '') {
      throw new Error('Ícone é obrigatório')
    }
    
    return prisma.category.create({ data: { name: name.trim(), icon: icon.trim() } })
  },
  update: async (id: string, name: string, icon: string) => {
    if (!id || id.trim() === '') {
      throw new Error('ID é obrigatório')
    }
    if (!name || name.trim() === '') {
      throw new Error('Nome é obrigatório')
    }
    if (!icon || icon.trim() === '') {
      throw new Error('Ícone é obrigatório')
    }
    
    return prisma.category.update({ where: { id }, data: { name: name.trim(), icon: icon.trim() } })
  },
  delete: async (id: string) => {
    if (!id || id.trim() === '') {
      throw new Error('ID é obrigatório')
    }
    
    return prisma.category.delete({ where: { id } })
  },
}
