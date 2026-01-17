import { RequestHandler } from 'express'
import { randomUUID, UUID } from 'node:crypto'
import z from 'zod'

import { JwtHandlerPort } from '@core'
import { AppError } from '../../core/application/errors/app.error'
import { AuthRepository } from './auth.repository'

const CookiesSessionSchema = z.object({
  session: z.jwt(),
})

interface JwtPayload {
  userId: UUID
}

export const authMiddleware =
  (jwt: JwtHandlerPort): RequestHandler =>
  async (req, _res, next) => {
    const parseResult = CookiesSessionSchema.safeParse(req.cookies)
    if (!parseResult.success) {
      return next(AppError.Unauthorized())
    }

    const payload = jwt.verify<JwtPayload>(parseResult.data.session)
    if (!payload?.userId) {
      return next(AppError.Unauthorized())
    }

    const user = await AuthRepository.findUserById(payload.userId)
    if (!user) {
      return next(AppError.Unauthorized())
    }

    req.context = {
      userId: payload.userId,
      traceId: randomUUID(),
    }

    next()
  }
