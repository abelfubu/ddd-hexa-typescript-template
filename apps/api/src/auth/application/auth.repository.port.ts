import { User } from '@core'

export interface AuthRepositoryPort {
  findUserByEmail(email: string): Promise<User | null>
  save(user: User): Promise<User>
}
