import { DomainError } from '../domain.error'

export const UserError = {
  InvalidUsername: () =>
    DomainError.create({
      message: 'User username is invalid.',
      code: 'user.create.invalidUsername',
      details: ['Username should be at least 4 characters long.'],
    }),
  InvalidEmail: () =>
    DomainError.create({
      message: 'Invalid email format.',
      code: 'user.create.invalidEmail',
      details: ['Invalid email format.'],
    }),
  InvalidPassword: () =>
    DomainError.create({
      message: 'Invalid Password',
      code: 'user.crate.invalidPassword',
      details: ['Password should be at least 6 characters long.'],
    }),
}
