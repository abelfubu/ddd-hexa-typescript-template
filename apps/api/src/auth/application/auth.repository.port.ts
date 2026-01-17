import { UUID } from 'node:crypto'

import { User } from '@core'

export interface AuthRepositoryPort {
  findUserById(id: UUID): Promise<User | null>
  findUserByEmail(email: string): Promise<User | null>
  save(user: User): Promise<User>
}
