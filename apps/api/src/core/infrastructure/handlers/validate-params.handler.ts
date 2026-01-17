import type { StandardSchemaV1 } from '@standard-schema/spec'
import { RequestHandler } from 'express'
import { AppError } from '../../application/errors/app.error'

export function validateParams<T>(
  schema: StandardSchemaV1<T>,
): RequestHandler<T, NonNullable<unknown>, NonNullable<unknown>> {
  return async (req, _res, next) => {
    const validationResult = schema['~standard'].validate(req.params)

    const result =
      validationResult instanceof Promise
        ? await validationResult
        : validationResult

    if (result.issues) {
      return next(
        AppError.BadRequest({
          message: 'Invalid request params',
          code: 'errors.invalidRequestParams',
          details: result.issues.map((issue) => issue.message),
        }),
      )
    }

    return next()
  }
}
