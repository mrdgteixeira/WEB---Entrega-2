import { TransactionRepository } from '../repositories/transaction.repository'
import { CreateTransactionDto, UpdateTransactionDto } from '../entities'
import { ValidationHelper, NotFoundError, ValidationError } from '../common'

const transactionRepository = new TransactionRepository()

export const TransactionService = {
  getAll: async () => {
    return transactionRepository.findAll()
  },
  getById: async (id: string) => {
    if (!ValidationHelper.isNotEmpty(id)) {
      throw new ValidationError('ID é obrigatório')
    }
    
    const transaction = await transactionRepository.findById(id)
    if (!transaction) {
      throw new NotFoundError('Transação')
    }
    
    return transaction
  },
  create: async (data: CreateTransactionDto) => {
    if (data.description && !ValidationHelper.isNotEmpty(data.description)) {
      throw new ValidationError('Descrição não pode ser vazia')
    }
    if (!data.type || !['income', 'expense'].includes(data.type)) {
      throw new ValidationError('Tipo deve ser "income" ou "expense"')
    }
    if (!data.amount || data.amount === 0) {
      throw new ValidationError('Valor é obrigatório')
    }
    if (!data.date) {
      throw new ValidationError('Data é obrigatória')
    }
    
    return transactionRepository.create(data)
  },
  update: async (id: string, data: UpdateTransactionDto) => {
    if (!ValidationHelper.isNotEmpty(id)) {
      throw new ValidationError('ID é obrigatório')
    }
    
    const exists = await transactionRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Transação')
    }
    
    if (data.description && !ValidationHelper.isNotEmpty(data.description)) {
      throw new ValidationError('Descrição não pode ser vazia')
    }
    if (data.type && !['income', 'expense'].includes(data.type)) {
      throw new ValidationError('Tipo deve ser "income" ou "expense"')
    }
    if (data.amount && data.amount === 0) {
      throw new ValidationError('Valor não pode ser zero')
    }
    
    return transactionRepository.update(id, data)
  },
  delete: async (id: string) => {
    if (!ValidationHelper.isNotEmpty(id)) {
      throw new ValidationError('ID é obrigatório')
    }
    
    const exists = await transactionRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Transação')
    }
    
    return transactionRepository.delete(id)
  }
}
