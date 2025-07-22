import { PrismaClient } from '../../prisma/generated'
import { DatabaseConnection } from '../common'

export abstract class BaseRepository {
  protected prisma: PrismaClient

  constructor() {
    this.prisma = DatabaseConnection.getInstance()
  }

  protected async handleError(error: any, operation: string): Promise<never> {
    console.error(`Database error in ${operation}:`, error)
    
    // Let P2002 (unique constraint) errors bubble up to service layer for custom handling
    if (error.code === 'P2002') {
      throw error
    }
    if (error.code === 'P2025') {
      throw new Error('Registro não encontrado')
    }
    
    throw new Error(`Erro na operação: ${operation}`)
  }
}
