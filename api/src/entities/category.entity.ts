export interface Category {
  id: string
  name: string
  icon: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateCategoryDto {
  name: string
  icon: string
}

export interface UpdateCategoryDto {
  name?: string
  icon?: string
}
