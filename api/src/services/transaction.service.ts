import { PrismaClient } from '../../../generated/prisma'
const prisma = new PrismaClient()

export const TransactionService = {
  getAll: async () =>
    prisma.transaction.findMany({ include: { bank: true, category: true } }),
  create: async (data: any) => {
    if (!data.description || data.description.trim() === '') {
      throw new Error('Descrição é obrigatória')
    }
    if (!data.type || !['income', 'expense'].includes(data.type)) {
      throw new Error('Tipo deve ser "income" ou "expense"')
    }
    if (!data.amount || data.amount <= 0) {
      throw new Error('Valor deve ser maior que zero')
    }
    if (!data.bankId || data.bankId.trim() === '') {
      throw new Error('ID do banco é obrigatório')
    }
    if (!data.categoryId || data.categoryId.trim() === '') {
      throw new Error('ID da categoria é obrigatório')
    }
    if (!data.date) {
      throw new Error('Data é obrigatória')
    }
    
    return prisma.transaction.create({ data })
  },
  update: async (id: string, data: any) => {
    if (!id || id.trim() === '') {
      throw new Error('ID é obrigatório')
    }
    if (data.description && data.description.trim() === '') {
      throw new Error('Descrição não pode ser vazia')
    }
    if (data.type && !['income', 'expense'].includes(data.type)) {
      throw new Error('Tipo deve ser "income" ou "expense"')
    }
    if (data.amount && data.amount <= 0) {
      throw new Error('Valor deve ser maior que zero')
    }
    if (data.bankId && data.bankId.trim() === '') {
      throw new Error('ID do banco não pode ser vazio')
    }
    if (data.categoryId && data.categoryId.trim() === '') {
      throw new Error('ID da categoria não pode ser vazio')
    }
    
    return prisma.transaction.update({ where: { id }, data })
  },
  delete: async (id: string) => {
    if (!id || id.trim() === '') {
      throw new Error('ID é obrigatório')
    }
    
    return prisma.transaction.delete({ where: { id } })
  },
}
