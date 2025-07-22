"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationHelper = exports.DateHelper = exports.ResponseHelper = void 0;
class ResponseHelper {
    static success(data, message) {
        return {
            success: true,
            data,
            message
        };
    }
    static error(error, message) {
        return {
            success: false,
            error,
            message
        };
    }
}
exports.ResponseHelper = ResponseHelper;
class DateHelper {
    static toISOString(date) {
        if (typeof date === 'string') {
            return new Date(date).toISOString();
        }
        return date.toISOString();
    }
    static isValidDate(date) {
        return date instanceof Date && !isNaN(date.getTime());
    }
}
exports.DateHelper = DateHelper;
class ValidationHelper {
    static isValidUUID(uuid) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    }
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isNotEmpty(value) {
        return value !== null && value !== undefined && value.trim() !== '';
    }
    static isPositiveNumber(value) {
        return typeof value === 'number' && value > 0;
    }
    static isValidDate(date) {
        return DateHelper.isValidDate(date);
    }
}
exports.ValidationHelper = ValidationHelper;
