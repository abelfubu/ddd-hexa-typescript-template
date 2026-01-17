import { ErrorRequestHandler } from 'express'

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  if (process.env.NODE_ENV !== 'production') {
    // console.error(err)
    return res.status(500).json({ message: err.message })
  }

  res.status(500).json({ message: 'Internal Server Error' })
}
