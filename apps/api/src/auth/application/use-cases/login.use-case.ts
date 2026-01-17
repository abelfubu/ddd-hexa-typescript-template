import { UseCase, User } from '@core'
import { AuthRepositoryPort } from '../auth.repository.port'
import { EncryptorPort } from '../encryptor.port'

interface LoginRequest {
  email: string
  password: string
}

export const LoginUseCase = (
  repository: AuthRepositoryPort,
  encryptor: EncryptorPort,
): UseCase<LoginRequest, User | null> => ({
  execute: async ({ email, password }) => {
    const user = await repository.findUserByEmail(email)

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const validCredentials = await encryptor.compare(password, user.password)
    if (!validCredentials) {
      throw new Error('Invalid credentials')
    }

    return user
  },
})
