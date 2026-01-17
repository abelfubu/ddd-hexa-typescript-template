import { db, User } from '@core'
import { UUID } from 'node:crypto'
import { AuthRepositoryPort } from '../application/auth.repository.port'

export const AuthRepository: AuthRepositoryPort = {
  findUserByEmail: (email: string): Promise<User | null> => {
    return db('users').where({ email }).first()
  },

  findUserById: (id: UUID): Promise<User | null> => {
    return db('users').where({ id }).first()
  },

  save: async (user: User): Promise<User> => {
    await db('users').insert(user).returning('*')
    return user
  },
}
