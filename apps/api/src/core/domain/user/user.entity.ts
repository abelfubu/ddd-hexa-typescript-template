import { randomUUID, UUID } from 'node:crypto'
import { AggregateRoot } from '../aggregate-root.entity'
import { UserErrors } from './user.errors'

export class User extends AggregateRoot<UUID> {
  private constructor(
    readonly username: string,
    readonly email: string,
    readonly password: string,
  ) {
    super(randomUUID())
  }

  static create(username: string, email: string, password: string): User {
    if (!username || username.trim().length < 4) {
      throw new Error(UserErrors.InvalidUsername)
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error(UserErrors.InvalidEmail)
    }

    if (!password || password.length < 6) {
      throw new Error(UserErrors.InvalidPassword)
    }

    return new User(username, email, password)
  }
}
