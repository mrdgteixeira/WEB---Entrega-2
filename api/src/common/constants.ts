export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500
} as const

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense'
} as const

export const DEFAULT_PAGINATION = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100
} as const

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: (field: string) => `${field} é obrigatório`,
  INVALID_FORMAT: (field: string) => `${field} tem formato inválido`,
  NOT_FOUND: (resource: string) => `${resource} não encontrado`,
  ALREADY_EXISTS: (resource: string) => `${resource} já existe`
} as const
