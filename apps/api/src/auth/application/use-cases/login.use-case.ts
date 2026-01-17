import { AppError, UseCase, User } from '@core'

import { AuthRepositoryPort } from '../auth.repository.port'
import { EncryptorPort } from '../encryptor.port'

interface LoginRequest {
  email: string
  password: string
}

export const LoginUseCase = (
  repository: AuthRepositoryPort,
  encryptor: EncryptorPort,
): UseCase<LoginRequest, User> => ({
  execute: async ({ email, password }) => {
    const user = await repository.findUserByEmail(email)

    if (!user) {
      throw AppError.BadRequest({
        message: 'Invalid credentials',
        code: 'errors.invalidCredentials',
        details: ['The provided email does not exist'],
      })
    }

    const validCredentials = await encryptor.compare(password, user.password)
    if (!validCredentials) {
      throw AppError.BadRequest({
        message: 'Invalid credentials',
        code: 'errors.invalidCredentials',
        details: ['Invalid credentials provided'],
      })
    }

    return user
  },
})
