import { RequestHandler } from 'express'
import z from 'zod'

import { asyncHandler, JwtHandlerPort, UseCase, User } from '@core'

export const LoginBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6),
})

type LoginRequest = z.infer<typeof LoginBodySchema>

export const loginController = (
  useCase: UseCase<LoginRequest, User>,
  jwt: JwtHandlerPort,
): RequestHandler<NonNullable<unknown>, NonNullable<unknown>, LoginRequest> => {
  return asyncHandler(async (req, res) => {
    const user = await useCase.execute(req.body)

    return res
      .cookie('session', jwt.sign({ userId: user.id }), {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      })
      .status(200)
      .json({ username: user.username, email: user.email })
  })
}
