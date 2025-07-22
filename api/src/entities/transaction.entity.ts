import { Bank } from './bank.entity'
import { Category } from './category.entity'

export interface Transaction {
  id: string
  description: string
  type: 'income' | 'expense'
  amount: number
  bankId: string
  categoryId: string
  date: Date
  createdAt?: Date
  updatedAt?: Date
  
  // Relações
  bank?: Bank
  category?: Category
}

export interface CreateTransactionDto {
  description: string
  type: 'income' | 'expense'
  amount: number
  bankId: string
  categoryId: string
  date: Date
}

export interface UpdateTransactionDto {
  description?: string
  type?: 'income' | 'expense'
  amount?: number
  bankId?: string
  categoryId?: string
  date?: Date
}
