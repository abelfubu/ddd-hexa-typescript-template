import { UUID } from 'node:crypto'

import { db, User, withPersistenceHandling } from '@core'
import { AuthRepositoryPort } from '../application/auth.repository.port'

export const AuthRepository: AuthRepositoryPort = {
  findUserByEmail: (email: string): Promise<User | null> => {
    return withPersistenceHandling(() => db('users').where({ email }).first(), {
      queryName: 'AuthRepository.findUserByEmail',
      table: 'users',
    })
  },

  findUserById: (id: UUID): Promise<User | null> => {
    return withPersistenceHandling(() => db('users').where({ id }).first(), {
      queryName: 'AuthRepository.findUserById',
      table: 'users',
    })
  },

  save: async (user: User): Promise<User> => {
    await withPersistenceHandling(
      () => db('users').insert(user).returning('*'),
      {
        queryName: 'AuthRepository.save',
        table: 'users',
      },
    )
    return user
  },
}
