import { PrismaClient } from '../../../generated/prisma'
import { DatabaseConnection } from '../common'

export abstract class BaseRepository {
  protected prisma: PrismaClient

  constructor() {
    this.prisma = DatabaseConnection.getInstance()
  }

  protected async handleError(error: any, operation: string): Promise<never> {
    console.error(`Database error in ${operation}:`, error)
    
    if (error.code === 'P2002') {
      throw new Error('Registro já existe')
    }
    if (error.code === 'P2025') {
      throw new Error('Registro não encontrado')
    }
    
    throw new Error(`Erro na operação: ${operation}`)
  }
}
