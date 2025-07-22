import { BankRepository } from '../repositories/bank.repository'
import { CreateBankDto, UpdateBankDto } from '../entities'
import { NotFoundError, ValidationError } from '../common'

const bankRepository = new BankRepository()

export const BankService = {
  getAll: async () => {
    return bankRepository.findAll()
  },
  getById: async (id: string) => {
    const bank = await bankRepository.findById(id)
    if (!bank) {
      throw new NotFoundError('Banco')
    }
    
    return bank
  },
  create: async (data: CreateBankDto) => {
    try {
      return await bankRepository.create(data)
    } catch (error: any) {
      // Handle Prisma unique constraint errors
      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0]
        if (field === 'ispb') {
          throw new ValidationError('Um banco com este ISPB já existe no sistema')
        } else if (field === 'name') {
          throw new ValidationError('Um banco com este nome já existe no sistema')
        } else if (field === 'code') {
          throw new ValidationError('Um banco com este código já existe no sistema')
        } else {
          throw new ValidationError('Este banco já existe no sistema')
        }
      }
      throw error
    }
  },
  update: async (id: string, data: UpdateBankDto) => {
    const exists = await bankRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Banco')
    }
    
    try {
      return await bankRepository.update(id, data)
    } catch (error: any) {
      // Handle Prisma unique constraint errors
      if (error.code === 'P2002') {
        const field = error.meta?.target?.[0]
        if (field === 'ispb') {
          throw new ValidationError('Um banco com este ISPB já existe no sistema')
        } else if (field === 'name') {
          throw new ValidationError('Um banco com este nome já existe no sistema')
        } else if (field === 'code') {
          throw new ValidationError('Um banco com este código já existe no sistema')
        } else {
          throw new ValidationError('Este banco já existe no sistema')
        }
      }
      throw error
    }
  },
  delete: async (id: string) => {
    const exists = await bankRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Banco')
    }
    
    return bankRepository.delete(id)
  },
}