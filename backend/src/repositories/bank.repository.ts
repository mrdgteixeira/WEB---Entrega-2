import { BaseRepository } from './base.repository'
import { CreateBankDto, UpdateBankDto } from '../entities'

export class BankRepository extends BaseRepository {
  async findAll() {
    try {
      return await this.prisma.bank.findMany({
        orderBy: { name: 'asc' }
      })
    } catch (error) {
      return this.handleError(error, 'findAll banks')
    }
  }

  async findById(id: string) {
    try {
      return await this.prisma.bank.findUnique({ 
        where: { id } 
      })
    } catch (error) {
      return this.handleError(error, 'findById bank')
    }
  }

  async create(data: CreateBankDto) {
    try {
      return await this.prisma.bank.create({ 
        data 
      })
    } catch (error) {
      return this.handleError(error, 'create bank')
    }
  }

  async update(id: string, data: Partial<UpdateBankDto>) {
    try {
      return await this.prisma.bank.update({ 
        where: { id }, 
        data 
      })
    } catch (error) {
      return this.handleError(error, 'update bank')
    }
  }

  async delete(id: string) {
    try {
      return await this.prisma.bank.delete({ 
        where: { id } 
      })
    } catch (error) {
      return this.handleError(error, 'delete bank')
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.prisma.bank.count({ 
        where: { id }
      })
      return count > 0
    } catch (error) {
      return this.handleError(error, 'check bank exists')
    }
  }

  async findByName(name: string) {
    try {
      return await this.prisma.bank.findMany({
        where: {
          name: {
            contains: name
          }
        }
      })
    } catch (error) {
      return this.handleError(error, 'findByName bank')
    }
  }
}
