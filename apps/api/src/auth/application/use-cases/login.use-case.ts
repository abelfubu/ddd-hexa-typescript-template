import { UseCase, User } from '@core'

import { AuthError } from '../auth.error'
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
      throw AuthError.InvalidCredentials()
    }

    const validCredentials = await encryptor.compare(password, user.password)
    if (!validCredentials) {
      throw AuthError.InvalidCredentials()
    }

    return user
  },
})
