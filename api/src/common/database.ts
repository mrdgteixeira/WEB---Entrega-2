import { PrismaClient } from '../../../generated/prisma'

// Singleton pattern para evitar múltiplas instâncias do Prisma
class DatabaseConnection {
  private static instance: PrismaClient
  
  static getInstance(): PrismaClient {
    if (!this.instance) {
      this.instance = new PrismaClient({
        log: ['error', 'warn'],
        errorFormat: 'minimal'
      })
    }
    return this.instance
  }
  
  static async disconnect(): Promise<void> {
    if (this.instance) {
      await this.instance.$disconnect()
    }
  }
}

export { DatabaseConnection }
