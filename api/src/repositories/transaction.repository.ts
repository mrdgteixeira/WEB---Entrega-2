import { BaseRepository } from './base.repository'
import { CreateTransactionDto, UpdateTransactionDto } from '../entities'

export class TransactionRepository extends BaseRepository {

  async findAll() {
    return this.prisma.transaction.findMany({ 
      include: { 
        bank: true, 
        category: true 
      } 
    })
  }

  async findById(id: string) {
    return this.prisma.transaction.findUnique({ 
      where: { id },
      include: { 
        bank: true, 
        category: true 
      } 
    })
  }

  async create(data: {
    description?: string
    type: string
    amount: number
    bankId?: string
    categoryId?: string
    date: Date
  }) {
    return this.prisma.transaction.create({ 
      data,
      include: { 
        bank: true, 
        category: true 
      } 
    })
  }

  async update(id: string, data: Partial<{
    description?: string
    type: string
    amount: number
    bankId?: string
    categoryId?: string
    date: Date
  }>) {
    return this.prisma.transaction.update({ 
      where: { id }, 
      data,
      include: { 
        bank: true, 
        category: true 
      } 
    })
  }

  async delete(id: string) {
    return this.prisma.transaction.delete({ 
      where: { id } 
    })
  }

  async exists(id: string): Promise<boolean> {
    const transaction = await this.prisma.transaction.findUnique({ 
      where: { id },
      select: { id: true }
    })
    return !!transaction
  }

  async findByBankId(bankId: string) {
    return this.prisma.transaction.findMany({ 
      where: { bankId },
      include: { 
        bank: true, 
        category: true 
      } 
    })
  }

  async findByCategoryId(categoryId: string) {
    return this.prisma.transaction.findMany({ 
      where: { categoryId },
      include: { 
        bank: true, 
        category: true 
      } 
    })
  }
}
