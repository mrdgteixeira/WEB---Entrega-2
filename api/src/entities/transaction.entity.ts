import { Bank } from './bank.entity'
import { Category } from './category.entity'

export interface Transaction {
  id: string
  description?: string
  type: 'income' | 'expense'
  amount: number
  bankId?: string
  categoryId?: string
  date: Date
  createdAt?: Date
  updatedAt?: Date
  
  bank?: Bank
  category?: Category
}

export interface CreateTransactionDto {
  description?: string
  amount: number
  type: string
  date: Date
  categoryId?: string
  bankId?: string
}

export interface UpdateTransactionDto {
  description?: string
  amount?: number
  type?: string
  date?: Date
  categoryId?: string
  bankId?: string
}
