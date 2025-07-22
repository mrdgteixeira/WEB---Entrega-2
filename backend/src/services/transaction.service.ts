import { TransactionRepository } from '../repositories/transaction.repository'
import { CreateTransactionDto, UpdateTransactionDto } from '../entities'
import { NotFoundError, ValidationError } from '../common'

// Internal types for repository layer (with Date objects)
interface CreateTransactionData {
  description?: string
  amount: number
  type: 'income' | 'expense'
  date: Date
  categoryId?: string
  bankId?: string
}

interface UpdateTransactionData {
  description?: string
  amount?: number
  type?: 'income' | 'expense'
  date?: Date
  categoryId?: string
  bankId?: string
}

const transactionRepository = new TransactionRepository()

export const TransactionService = {
  getAll: async () => {
    return transactionRepository.findAll()
  },
  getById: async (id: string) => {
    const transaction = await transactionRepository.findById(id)
    if (!transaction) {
      throw new NotFoundError('Transação')
    }
    
    return transaction
  },
  create: async (data: CreateTransactionDto) => {
    // Convert string date to Date object for database
    const dateObj = new Date(data.date)
    if (isNaN(dateObj.getTime())) {
      throw new ValidationError('Data inválida fornecida')
    }
    
    const processedData: CreateTransactionData = {
      ...data,
      date: dateObj
    }
    return transactionRepository.create(processedData)
  },
  update: async (id: string, data: UpdateTransactionDto) => {
    const exists = await transactionRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Transação')
    }
    
    // Convert string date to Date object for database if date is provided
    const processedData: UpdateTransactionData = {
      description: data.description,
      amount: data.amount,
      type: data.type,
      categoryId: data.categoryId,
      bankId: data.bankId
    }
    
    if (data.date) {
      const dateObj = new Date(data.date)
      if (isNaN(dateObj.getTime())) {
        throw new ValidationError('Data inválida fornecida')
      }
      processedData.date = dateObj
    }
    
    return transactionRepository.update(id, processedData)
  },
  delete: async (id: string) => {
    const exists = await transactionRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Transação')
    }
    
    return transactionRepository.delete(id)
  }
}
