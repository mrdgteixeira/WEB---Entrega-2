export interface Bank {
  id: string
  name: string
  createdAt?: Date
  updatedAt?: Date
}

export interface CreateBankDto {
  ispb: string
  name: string
  code: string
  fullName: string
}

export interface UpdateBankDto {
  ispb?: string
  name?: string
  code?: string
  fullName?: string
}
