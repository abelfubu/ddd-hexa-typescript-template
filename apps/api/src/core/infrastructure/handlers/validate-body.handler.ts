import { AppError } from '@core'
import type { StandardSchemaV1 } from '@standard-schema/spec'
import { RequestHandler } from 'express'

export function validateBody<T>(
  schema: StandardSchemaV1<T>,
): RequestHandler<NonNullable<unknown>, NonNullable<unknown>, T> {
  return async (req, _res, next) => {
    const validationResult = schema['~standard'].validate(req.body)

    const result =
      validationResult instanceof Promise
        ? await validationResult
        : validationResult

    if (result.issues) {
      return next(
        AppError.BadRequest({
          message: 'Invalid request body',
          code: 'errors.invalidRequestBody',
          details: result.issues.map((issue) => issue.message),
        }),
      )
    }

    return next()
  }
}
