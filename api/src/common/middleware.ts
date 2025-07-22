import { FastifyRequest, FastifyReply } from 'fastify'
import { ValidationHelper, ValidationError } from '../common'

export class ValidationMiddleware {
  static validateUUID(param: string) {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const params = request.params as Record<string, string>
      const value = params[param]
      
      if (!ValidationHelper.isValidUUID(value)) {
        throw new ValidationError(`${param} deve ser um UUID válido`)
      }
      
      done()
    }
  }

  static validateRequired(fields: string[]) {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const body = request.body as Record<string, any>
      
      for (const field of fields) {
        if (!body[field] || !ValidationHelper.isNotEmpty(String(body[field]))) {
          throw new ValidationError(`${field} é obrigatório`)
        }
      }
      
      done()
    }
  }

  static validateBankData() {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const { name } = request.body as { name: string }
      
      if (!ValidationHelper.isNotEmpty(name)) {
        throw new ValidationError('Nome é obrigatório')
      }
      
      if (name.length < 2) {
        throw new ValidationError('Nome deve ter pelo menos 2 caracteres')
      }
      
      if (name.length > 100) {
        throw new ValidationError('Nome deve ter no máximo 100 caracteres')
      }
      
      done()
    }
  }

  static validateCategoryData() {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const { name, icon } = request.body as { name: string; icon: string }
      
      if (!ValidationHelper.isNotEmpty(name)) {
        throw new ValidationError('Nome é obrigatório')
      }
      
      if (!ValidationHelper.isNotEmpty(icon)) {
        throw new ValidationError('Ícone é obrigatório')
      }
      
      if (name.length < 2 || name.length > 50) {
        throw new ValidationError('Nome deve ter entre 2 e 50 caracteres')
      }
      
      done()
    }
  }

  static validateTransactionData() {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const { description, type, amount, bankId, categoryId, date } = request.body as {
        description: string
        type: string
        amount: number
        bankId: string
        categoryId: string
        date: string
      }
      
      if (!ValidationHelper.isNotEmpty(description)) {
        throw new ValidationError('Descrição é obrigatória')
      }
      
      if (!['income', 'expense'].includes(type)) {
        throw new ValidationError('Tipo deve ser "income" ou "expense"')
      }
      
      if (!ValidationHelper.isPositiveNumber(amount)) {
        throw new ValidationError('Valor deve ser maior que zero')
      }
      
      if (!ValidationHelper.isValidUUID(bankId)) {
        throw new ValidationError('ID do banco inválido')
      }
      
      if (!ValidationHelper.isValidUUID(categoryId)) {
        throw new ValidationError('ID da categoria inválido')
      }
      
      if (!ValidationHelper.isValidDate(new Date(date))) {
        throw new ValidationError('Data inválida')
      }
      
      done()
    }
  }
}
