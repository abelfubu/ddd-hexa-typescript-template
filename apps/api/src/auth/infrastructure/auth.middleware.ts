import { RequestHandler } from 'express'
import { randomUUID, UUID } from 'node:crypto'
import z from 'zod'

import { JwtHandlerPort } from '@core'

const CookiesSessionSchema = z.object({
  session: z.jwt(),
})

interface JwtPayload {
  userId: UUID
}

export const authMiddleware =
  (jwt: JwtHandlerPort): RequestHandler =>
  (req, res, next) => {
    const parseResult = CookiesSessionSchema.safeParse(req.cookies)
    if (!parseResult.success) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const payload = jwt.verify<JwtPayload>(parseResult.data.session)

    if (!payload?.userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    req.context = {
      userId: payload.userId,
      traceId: randomUUID(),
    }

    next()
  }
