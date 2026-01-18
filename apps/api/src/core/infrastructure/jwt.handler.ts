import jwt from 'jsonwebtoken'
import { type JwtHandlerPort } from '../application/jwt.handler.port'

export const JwtHandler: JwtHandlerPort = {
  sign: <T extends object>(payload: T) => {
    return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
      expiresIn: '1year',
    })
  },

  verify: <T>(token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as T
  },
}
