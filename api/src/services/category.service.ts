import { CategoryRepository } from '../repositories/category.repository'
import { CreateCategoryDto, UpdateCategoryDto } from '../entities'
import { ValidationHelper, NotFoundError, ValidationError } from '../common'

const categoryRepository = new CategoryRepository()

export const CategoryService = {
  getAll: async () => {
    return categoryRepository.findAll()
  },
  getById: async (id: string) => {
    if (!ValidationHelper.isNotEmpty(id)) {
      throw new ValidationError('ID é obrigatório')
    }
    
    const category = await categoryRepository.findById(id)
    if (!category) {
      throw new NotFoundError('Categoria')
    }
    
    return category
  },
  create: async (data: CreateCategoryDto) => {
    if (!ValidationHelper.isNotEmpty(data.name)) {
      throw new ValidationError('Nome é obrigatório')
    }
    if (!ValidationHelper.isNotEmpty(data.icon)) {
      throw new ValidationError('Ícone é obrigatório')
    }
    
    return categoryRepository.create({ 
      name: data.name.trim(), 
      icon: data.icon.trim() 
    })
  },
  update: async (id: string, data: UpdateCategoryDto) => {
    if (!ValidationHelper.isNotEmpty(id)) {
      throw new ValidationError('ID é obrigatório')
    }
    
    const exists = await categoryRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Categoria')
    }
    
    const updateData: any = {}
    if (data.name && ValidationHelper.isNotEmpty(data.name)) {
      updateData.name = data.name.trim()
    }
    if (data.icon && ValidationHelper.isNotEmpty(data.icon)) {
      updateData.icon = data.icon.trim()
    }
    
    return categoryRepository.update(id, updateData)
  },
  delete: async (id: string) => {
    if (!ValidationHelper.isNotEmpty(id)) {
      throw new ValidationError('ID é obrigatório')
    }
    
    const exists = await categoryRepository.exists(id)
    if (!exists) {
      throw new NotFoundError('Categoria')
    }
    
    return categoryRepository.delete(id)
  },
}
