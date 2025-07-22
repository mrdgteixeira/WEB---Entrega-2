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
    if (!ValidationHelper.isNotEmpty(data.ispb)) {
      throw new ValidationError('ISPB é obrigatório')
    }
    if (!ValidationHelper.isNotEmpty(data.code)) {
      throw new ValidationError('Código é obrigatório')
    }
    if (!ValidationHelper.isNotEmpty(data.fullName)) {
      throw new ValidationError('Nome completo é obrigatório')
    }
    
    return bankRepository.create({
      name: data.name.trim(),
      ispb: data.ispb.trim(),
      code: data.code.trim(),
      fullName: data.fullName.trim()
    })
  },
  update: async (id: string, data: UpdateBankDto) => {
    if (!ValidationHelper.isNotEmpty(id)) {
      throw new ValidationError('ID é obrigatório')
    }
    
    const exists = await bankRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Banco')
    }
    
    const updateData: any = {}
    if (data.name) updateData.name = data.name.trim()
    if (data.ispb) updateData.ispb = data.ispb.trim()
    if (data.code) updateData.code = data.code.trim()
    if (data.fullName) updateData.fullName = data.fullName.trim()
    
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