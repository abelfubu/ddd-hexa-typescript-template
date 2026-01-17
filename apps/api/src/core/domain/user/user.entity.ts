import { randomUUID, UUID } from 'node:crypto'
import { AggregateRoot } from '../aggregate-root.entity'
import { UserError } from './user.errors'

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
      throw UserError.InvalidUsername()
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw UserError.InvalidEmail()
    }

    if (!password || password.length < 6) {
      throw UserError.InvalidPassword()
    }

    return new User(username, email, password)
  }
}
