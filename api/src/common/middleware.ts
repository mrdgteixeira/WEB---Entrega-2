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
        if (!body[field] || !ValidationHelper.isNotEmptyAny(body[field])) {
          throw new ValidationError(`${field} é obrigatório`)
        }
      }
      
      done()
    }
  }

  static validateBankUpdateData() {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const body = request.body as { name?: string; ispb?: string; code?: string; fullName?: string }
      
      // Normalize data by trimming whitespace only if fields exist
      if (body.name) body.name = body.name.trim()
      if (body.ispb) body.ispb = body.ispb.trim()
      if (body.code) body.code = body.code.trim()
      if (body.fullName) body.fullName = body.fullName.trim()
      
      if (body.name && !ValidationHelper.isNotEmpty(body.name)) {
        throw new ValidationError('Nome não pode ser vazio')
      }
      if (body.ispb && !ValidationHelper.isNotEmpty(body.ispb)) {
        throw new ValidationError('ISPB não pode ser vazio')
      }
      if (body.code && !ValidationHelper.isNotEmpty(body.code)) {
        throw new ValidationError('Código não pode ser vazio')
      }
      if (body.fullName && !ValidationHelper.isNotEmpty(body.fullName)) {
        throw new ValidationError('Nome completo não pode ser vazio')
      }
      
      if (body.name && body.name.length < 2) {
        throw new ValidationError('Nome deve ter pelo menos 2 caracteres')
      }
      
      if (body.name && body.name.length > 100) {
        throw new ValidationError('Nome deve ter no máximo 100 caracteres')
      }
      
      // Additional validations for unique fields during updates
      if (body.ispb && (body.ispb.length !== 8 || !/^\d{8}$/.test(body.ispb))) {
        throw new ValidationError('ISPB deve conter exatamente 8 dígitos numéricos')
      }
      
      if (body.code && !/^\d{3}$/.test(body.code)) {
        throw new ValidationError('Código do banco deve conter exatamente 3 dígitos numéricos')
      }
      
      done()
    }
  }

  static validateBankData() {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const body = request.body as { name: string; ispb: string; code: string; fullName: string }
      const { name, ispb, code, fullName } = body
      
      // Normalize data by trimming whitespace only if fields exist
      if (name) body.name = name.trim()
      if (ispb) body.ispb = ispb.trim()
      if (code) body.code = code.trim()
      if (fullName) body.fullName = fullName.trim()
      
      if (!ValidationHelper.isNotEmpty(body.name)) {
        throw new ValidationError('Nome é obrigatório')
      }
      if (!ValidationHelper.isNotEmpty(body.ispb)) {
        throw new ValidationError('ISPB é obrigatório')
      }
      if (!ValidationHelper.isNotEmpty(body.code)) {
        throw new ValidationError('Código é obrigatório')
      }
      if (!ValidationHelper.isNotEmpty(body.fullName)) {
        throw new ValidationError('Nome completo é obrigatório')
      }
      
      if (body.name && body.name.length < 2) {
        throw new ValidationError('Nome deve ter pelo menos 2 caracteres')
      }
      
      if (body.name && body.name.length > 100) {
        throw new ValidationError('Nome deve ter no máximo 100 caracteres')
      }
      
      // Additional validations for unique fields
      if (body.ispb && (body.ispb.length !== 8 || !/^\d{8}$/.test(body.ispb))) {
        throw new ValidationError('ISPB deve conter exatamente 8 dígitos numéricos')
      }
      
      if (body.code && !/^\d{3}$/.test(body.code)) {
        throw new ValidationError('Código do banco deve conter exatamente 3 dígitos numéricos')
      }
      
      done()
    }
  }

  static validateCategoryUpdateData() {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const body = request.body as { name?: string; icon?: string }
      
      // Normalize data by trimming whitespace only if fields exist
      if (body.name) body.name = body.name.trim()
      if (body.icon) body.icon = body.icon.trim()
      
      if (body.name && !ValidationHelper.isNotEmpty(body.name)) {
        throw new ValidationError('Nome não pode ser vazio')
      }
      
      if (body.name && (body.name.length < 2 || body.name.length > 50)) {
        throw new ValidationError('Nome deve ter entre 2 e 50 caracteres')
      }
      
      if (body.icon && body.icon.length > 10) {
        throw new ValidationError('Ícone deve ter no máximo 10 caracteres')
      }
      
      done()
    }
  }

  static validateCategoryData() {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const body = request.body as { name: string; icon?: string }
      
      // Normalize data by trimming whitespace only if fields exist
      if (body.name) body.name = body.name.trim()
      if (body.icon) body.icon = body.icon.trim()
      
      if (!ValidationHelper.isNotEmpty(body.name)) {
        throw new ValidationError('Nome é obrigatório')
      }
      
      if (body.name && (body.name.length < 2 || body.name.length > 50)) {
        throw new ValidationError('Nome deve ter entre 2 e 50 caracteres')
      }
      
      if (body.icon && body.icon.length > 10) {
        throw new ValidationError('Ícone deve ter no máximo 10 caracteres')
      }
      
      done()
    }
  }

  static validateTransactionUpdateData() {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const body = request.body as {
        description?: string
        type?: string
        amount?: number
        bankId?: string
        categoryId?: string
        date?: string
      }
      
      // Normalize data by trimming whitespace only if fields exist
      if (body.description) body.description = body.description.trim()
      if (body.type) body.type = body.type.trim()
      if (body.date) body.date = body.date.trim()
      
      if (body.type && !['income', 'expense'].includes(body.type)) {
        throw new ValidationError('Tipo deve ser "income" ou "expense"')
      }
      
      // Additional amount validations for updates
      if (body.amount !== undefined) {
        if (!ValidationHelper.isValidTransactionAmount(body.amount)) {
          throw new ValidationError('Valor deve ser um número positivo válido com no máximo 2 casas decimais e não exceder R$ 999.999.999,99')
        }
      }
      
      if (body.bankId && !ValidationHelper.isValidUUID(body.bankId)) {
        throw new ValidationError('ID do banco inválido')
      }
      
      if (body.categoryId && !ValidationHelper.isValidUUID(body.categoryId)) {
        throw new ValidationError('ID da categoria inválido')
      }
      
      if (body.date && !ValidationHelper.isValidDate(new Date(body.date))) {
        throw new ValidationError('Data inválida')
      }
      
      if (body.description && body.description.length > 255) {
        throw new ValidationError('Descrição deve ter no máximo 255 caracteres')
      }
      
      done()
    }
  }

  static validateTransactionData() {
    return (request: FastifyRequest, reply: FastifyReply, done: () => void) => {
      const body = request.body as {
        description?: string
        type: string
        amount: number
        bankId?: string
        categoryId?: string
        date: string
      }
      
      // Normalize data by trimming whitespace only if fields exist
      if (body.description) body.description = body.description.trim()
      if (body.type) body.type = body.type.trim()
      if (body.date) body.date = body.date.trim()
      
      if (!['income', 'expense'].includes(body.type)) {
        throw new ValidationError('Tipo deve ser "income" ou "expense"')
      }
      
      if (!ValidationHelper.isValidTransactionAmount(body.amount)) {
        throw new ValidationError('Valor deve ser um número positivo válido com no máximo 2 casas decimais e não exceder R$ 999.999.999,99')
      }
      
      if (body.bankId && !ValidationHelper.isValidUUID(body.bankId)) {
        throw new ValidationError('ID do banco inválido')
      }
      
      if (body.categoryId && !ValidationHelper.isValidUUID(body.categoryId)) {
        throw new ValidationError('ID da categoria inválido')
      }
      
      if (!ValidationHelper.isValidDate(new Date(body.date))) {
        throw new ValidationError('Data inválida')
      }
      
      if (body.description && body.description.length > 255) {
        throw new ValidationError('Descrição deve ter no máximo 255 caracteres')
      }
      
      done()
    }
  }
}
