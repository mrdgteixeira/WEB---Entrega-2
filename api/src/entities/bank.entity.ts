export interface Bank {
  id: string
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateBankDto {
  name: string
}

export interface UpdateBankDto {
  name?: string
}
