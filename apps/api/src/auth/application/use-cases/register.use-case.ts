import { type UseCase, User } from '@core'

import { AuthError } from '../auth.error'
import { type AuthRepositoryPort } from '../auth.repository.port'
import { type EncryptorPort } from '../encryptor.port'

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
      throw AuthError.EmailAlreadyInUse()
    }

    const hashedPassword = await encryptor.hash(password)
    const user = User.create(username, email, hashedPassword)
    await repository.save(user)

    return user
  },
})
