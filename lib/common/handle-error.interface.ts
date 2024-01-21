import { ResponseCode } from '@/common/response-code.enum'

export class NotFoundException extends Error {
  code: number

  constructor(message: string) {
    super(message) // Pass message to the base Error class
    this.code = ResponseCode.NOT_FOUND
    this.name = 'NotFoundException' // Set the error name as the class name

    // Maintaining proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundException)
    }
  }
}

export class BadRequestException extends Error {
  code: number

  constructor(message: string) {
    super(message) // Pass message to the base Error class
    this.code = ResponseCode.BAD_REQUEST
    this.name = 'BadRequestException' // Set the error name as the class name

    // Maintaining proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestException)
    }
  }
}
