import type { StandardSchemaV1 } from '@standard-schema/spec'
import { RequestHandler } from 'express'

export function validateQuery<T>(
  schema: StandardSchemaV1<T>,
): RequestHandler<
  NonNullable<unknown>,
  NonNullable<unknown>,
  NonNullable<unknown>,
  T
> {
  return async (req, res, next) => {
    const validationResult = schema['~standard'].validate(req.params)

    const result =
      validationResult instanceof Promise
        ? await validationResult
        : validationResult

    if (result.issues) {
      return res.status(400).json({
        ok: false,
        errors: result.issues.map((issue) => issue.message),
      })
    }

    return next()
  }
}
