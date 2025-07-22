import { PrismaClient } from '../../prisma/generated'

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
