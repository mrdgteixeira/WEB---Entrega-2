import { BankRepository } from '../repositories/bank.repository'
import { CreateBankDto, UpdateBankDto } from '../entities'
import { ValidationHelper, NotFoundError, ValidationError } from '../common'

const bankRepository = new BankRepository()

export const BankService = {
  getAll: async () => {
    return bankRepository.findAll()
  },
  getById: async (id: string) => {
    if (!ValidationHelper.isNotEmpty(id)) {
      throw new ValidationError('ID é obrigatório')
    }
    
    const bank = await bankRepository.findById(id)
    if (!bank) {
      throw new NotFoundError('Banco')
    }
    
    return bank
  },
  create: async (data: CreateBankDto) => {
    if (!ValidationHelper.isNotEmpty(data.name)) {
      throw new ValidationError('Nome é obrigatório')
    }
    
    return bankRepository.create({ name: data.name.trim() })
  },
  update: async (id: string, data: UpdateBankDto) => {
    if (!ValidationHelper.isNotEmpty(id)) {
      throw new ValidationError('ID é obrigatório')
    }
    if (data.name && !ValidationHelper.isNotEmpty(data.name)) {
      throw new ValidationError('Nome é obrigatório')
    }
    
    const exists = await bankRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Banco')
    }
    
    const updateData: any = {}
    if (data.name) updateData.name = data.name.trim()
    
    return bankRepository.update(id, updateData)
  },
  delete: async (id: string) => {
    if (!ValidationHelper.isNotEmpty(id)) {
      throw new ValidationError('ID é obrigatório')
    }
    
    const exists = await bankRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Banco')
    }
    
    return bankRepository.delete(id)
  },
}