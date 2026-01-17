import { RequestHandler } from 'express'
import z from 'zod'

import { asyncHandler, JwtHandlerPort, UseCase, User } from '@core'

export const RegisterBodySchema = z.object({
  username: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
})

type RegisterRequest = z.infer<typeof RegisterBodySchema>

export const registerController = (
  useCase: UseCase<RegisterRequest, User>,
  jwt: JwtHandlerPort,
): RequestHandler<
  NonNullable<unknown>,
  NonNullable<unknown>,
  RegisterRequest
> => {
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
