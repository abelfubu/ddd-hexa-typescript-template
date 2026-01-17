import { AppError, UseCase, User } from '@core'

import { AuthRepositoryPort } from '../auth.repository.port'
import { EncryptorPort } from '../encryptor.port'

interface RegisterRequest {
  username: string
  email: string
  password: string
}

export const RegisterUseCase = (
  repository: AuthRepositoryPort,
  encryptor: EncryptorPort,
): UseCase<RegisterRequest, User> => ({
  execute: async ({ email, username, password }) => {
    const existingUser = await repository.findUserByEmail(email)
    if (existingUser) {
      throw AppError.BadRequest({
        message: 'Email already in use',
        code: 'errors.emailInUse',
        details: [
          'Provide a different email, the email provided is already in use',
        ],
      })
    }

    const hashedPassword = await encryptor.hash(password)
    const user = User.create(username, email, hashedPassword)
    await repository.save(user)

    return user
  },
})
