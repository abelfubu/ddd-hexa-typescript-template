export class AppError extends Error {
  private constructor(
    readonly message: string,
    readonly code: string,
    readonly status: number,
    readonly details: string[],
  ) {
    super(message)
  }

  static isAppError(error: unknown): error is AppError {
    return error instanceof AppError
  }

  static NotFound({
    message,
    code,
    details = [],
  }: {
    message: string
    code: string
    details?: string[]
  }): AppError {
    return new AppError(message, code, 404, details)
  }

  static BadRequest({
    message,
    code,
    details = [],
  }: {
    message: string
    code: string
    details?: string[]
  }): AppError {
    return new AppError(message, code, 400, details)
  }

  static InternalServerError({
    details = [],
  }: { details?: string[] } = {}): AppError {
    return new AppError(
      'Internal server error',
      'errors.internalServerError',
      500,
      details,
    )
  }

  static Unauthorized(
    {
      message = 'Unauthorized',
      code = 'errors.unauthorized',
      details = [],
    }: { message?: string; code?: string; details?: string[] } = {
      message: 'Unauthorized',
      code: 'errors.unauthorized',
      details: [],
    },
  ): AppError {
    return new AppError(message, code, 401, details)
  }
}
