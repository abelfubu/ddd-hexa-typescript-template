import { UUID } from 'node:crypto'

declare module 'express-serve-static-core' {
  namespace Express {
    interface Request {
      context: {
        userId: UUID
        traceId: UUID
      }
    }
  }
}
