import { ApiResponse } from './interfaces'

export class ResponseHelper {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message
    }
  }

  static error(error: string, message?: string): ApiResponse {
    return {
      success: false,
      error,
      message
    }
  }
}

export class DateHelper {
  static toISOString(date: Date | string): string {
    if (typeof date === 'string') {
      return new Date(date).toISOString()
    }
    return date.toISOString()
  }

  static isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime())
  }
}

export class ValidationHelper {
  static isValidUUID(uuid: string | null | undefined): boolean {
    if (!uuid) return false
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuid)
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static isNotEmpty(value: string | null | undefined): boolean {
    if (value === null || value === undefined) {
      return false
    }
    return typeof value === 'string' && value.trim() !== ''
  }

  static isNotEmptyAny(value: any): boolean {
    if (value === null || value === undefined) {
      return false
    }
    return String(value).trim() !== ''
  }

  static isPositiveNumber(value: number): boolean {
    return typeof value === 'number' && value > 0
  }

  static isValidTransactionAmount(amount: number): boolean {
    // Check if it's a valid positive number
    if (!this.isPositiveNumber(amount)) {
      return false
    }
    
    // Check if it's not NaN or Infinity
    if (!Number.isFinite(amount)) {
      return false
    }
    
    // Check maximum value (999,999,999.99)
    if (amount > 999999999.99) {
      return false
    }
    
    // Check decimal places (max 2 for currency)
    const decimalPlaces = (amount.toString().split('.')[1] || '').length
    if (decimalPlaces > 2) {
      return false
    }
    
    return true
  }

  static isValidDate(date: any): boolean {
    return DateHelper.isValidDate(date)
  }
}
