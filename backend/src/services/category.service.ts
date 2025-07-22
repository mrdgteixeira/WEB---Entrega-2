import { CategoryRepository } from '../repositories/category.repository'
import { CreateCategoryDto, UpdateCategoryDto } from '../entities'
import { NotFoundError, ValidationError } from '../common'

const categoryRepository = new CategoryRepository()

export const CategoryService = {
  getAll: async () => {
    return categoryRepository.findAll()
  },
  getById: async (id: string) => {
    const category = await categoryRepository.findById(id)
    if (!category) {
      throw new NotFoundError('Categoria')
    }
    
    return category
  },
  create: async (data: CreateCategoryDto) => {
    try {
      return await categoryRepository.create(data)
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
        throw new ValidationError('Uma categoria com este nome já existe no sistema')
      }
      throw error
    }
  },
  update: async (id: string, data: UpdateCategoryDto) => {
    const exists = await categoryRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Categoria')
    }
    
    try {
      return await categoryRepository.update(id, data)
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('name')) {
        throw new ValidationError('Uma categoria com este nome já existe no sistema')
      }
      throw error
    }
  },
  delete: async (id: string) => {
    const exists = await categoryRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Categoria')
    }
    
    return categoryRepository.delete(id)
  },
}
