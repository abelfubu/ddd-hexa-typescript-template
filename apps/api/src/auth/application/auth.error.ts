import { AppError } from '@core'

export const AuthError = {
  InvalidCredentials: () =>
    AppError.BadRequest({
      message: 'Invalid credentials',
      code: 'errors.invalidCredentials',
      details: ['The provided credentials are invalid'],
    }),
  EmailAlreadyInUse: () =>
    AppError.BadRequest({
      message: 'Email already in use',
      code: 'errors.emailInUse',
      details: [
        'Provide a different email, the email provided is already in use',
      ],
    }),
}
