import { db, User } from '@core'
import { AuthRepositoryPort } from '../application/auth.repository.port'

export const AuthRepository: AuthRepositoryPort = {
  findUserByEmail: (email: string): Promise<User | null> => {
    return db('users').where({ email }).first()
  },

  save: async (user: User): Promise<User> => {
    await db('users').insert(user).returning('*')
    return user
  },
}
