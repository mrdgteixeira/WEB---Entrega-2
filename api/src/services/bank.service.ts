import { PrismaClient } from '../../../generated/prisma'
const prisma = new PrismaClient()

export const BankService = {
  getAll: async () => prisma.bank.findMany(),
  getById: async (id: string) => {
    if (!id || id.trim() === '') {
      throw new Error('ID é obrigatório')
    }
    
    const bank = await prisma.bank.findUnique({ where: { id } })
    if (!bank) {
      throw new Error('Banco não encontrado')
    }
    
    return bank
  },
  create: async (name: string) => {
    if (!name || name.trim() === '') {
      throw new Error('Nome é obrigatório')
    }
    
    return prisma.bank.create({ data: { name: name.trim() } })
  },
  update: async (id: string, name: string) => {
    if (!id || id.trim() === '') {
      throw new Error('ID é obrigatório')
    }
    if (!name || name.trim() === '') {
      throw new Error('Nome é obrigatório')
    }
    
    return prisma.bank.update({ where: { id }, data: { name: name.trim() } })
  },
  delete: async (id: string) => {
    if (!id || id.trim() === '') {
      throw new Error('ID é obrigatório')
    }
    
    return prisma.bank.delete({ where: { id } })
  },
}