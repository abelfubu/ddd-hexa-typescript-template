import { DomainError } from '@core'
import { ErrorRequestHandler } from 'express'
import { AppError } from '../../application/errors/app.error'

export const globalErrorHandler: ErrorRequestHandler<
  NonNullable<unknown>,
  AppError
> = (err, _req, res, _next) => {
  if (DomainError.isDomainError(err)) {
    const error = AppError.BadRequest({
      message: err.message,
      code: err.code,
      details: err.details,
    })
    return res.status(error.status).json(error)
  }

  if (AppError.isAppError(err)) {
    return res.status(err.status).json(err)
  }

  return res.status(500).json(
    AppError.InternalServerError({
      details: err?.message ? [err.message] : [],
    }),
  )
}
