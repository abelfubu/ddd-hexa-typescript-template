import { KnexTimeoutError } from 'knex'

import { AppError } from '@core'

type DbOperation<T> = () => Promise<T>

interface PersistenceContext {
  queryName?: string
  table?: string
}

export async function withPersistenceHandling<T>(
  operation: DbOperation<T>,
  context: PersistenceContext = {},
): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    throw mapKnexErrorToAppError(error, context)
  }
}

function mapKnexErrorToAppError(
  error: unknown,
  context: PersistenceContext,
): AppError {
  if (!isKnexError(error)) {
    return AppError.InternalServerError({
      details: [serializeUnknownError(error, context)],
    })
  }

  switch (error.code) {
    // unique_violation
    case '23505':
      return AppError.BadRequest({
        message: 'Duplicate value violates unique constraint',
        code: 'errors.persistence.uniqueViolation',
        details: buildDetails(error, context),
      })
    case '23503': // foreign_key_violation
      return AppError.BadRequest({
        message: 'Missing related record',
        code: 'errors.persistence.foreignKey',
        details: buildDetails(error, context),
      })
    case '53300': // too_many_connections
    case '57P01': // admin_shutdown
    case '08006': // connection_failure
      return AppError.InternalServerError({
        details: buildDetails(error, context),
      })
    default:
      return AppError.InternalServerError({
        details: buildDetails(error, context),
      })
  }
}
function isKnexError(error: unknown): error is KnexTimeoutError & {
  code?: string
  error?: number
  message: string
} {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

function buildDetails(
  error: { message: string; code?: string; errno?: number },
  context: PersistenceContext,
): string[] {
  const base = [`${context.queryName ?? 'Query'} failed: ${error.message}`]
  if (context.table) {
    base.push(`Table: ${context.table}`)
  }
  if (error.code) {
    base.push(`Code: ${error.code}`)
  }
  if (typeof error.errno === 'number') {
    base.push(`Errno: ${error.errno}`)
  }
  return base
}

function serializeUnknownError(
  error: unknown,
  context: PersistenceContext,
): string {
  if (error instanceof Error) {
    return `${context.queryName ?? 'Query'} failed: ${error.message}`
  }
  return `${context.queryName ?? 'Query'} failed with unknown error`
}
