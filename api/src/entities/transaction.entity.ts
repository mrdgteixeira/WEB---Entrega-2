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
  type: 'income' | 'expense'
  date: string  // Received as string from frontend, converted to Date in service
  categoryId?: string
  bankId?: string
}

export interface UpdateTransactionDto {
  description?: string
  amount?: number
  type?: 'income' | 'expense'
  date?: string  // Received as string from frontend, converted to Date in service
  categoryId?: string
  bankId?: string
}
