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
  static isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuid)
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static isNotEmpty(value: string): boolean {
    return value !== null && value !== undefined && value.trim() !== ''
  }

  static isPositiveNumber(value: number): boolean {
    return typeof value === 'number' && value > 0
  }

  static isValidDate(date: any): boolean {
    return DateHelper.isValidDate(date)
  }
}
