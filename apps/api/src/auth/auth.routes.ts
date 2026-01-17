import { Router } from 'express'

import { JwtHandler, validateBody } from '@core'
import * as useCase from './application/use-cases/'
import { AuthRepository } from './infrastructure/auth.repository'
import * as controller from './infrastructure/controllers/'
import { Encryptor } from './infrastructure/encryptor'

export function buildAuthRoutes(): Router {
  const router = Router()

  router.post(
    '/register',
    validateBody(controller.RegisterBodySchema),
    controller.registerController(
      useCase.RegisterUseCase(AuthRepository, Encryptor),
      JwtHandler,
    ),
  )

  router.post(
    '/login',
    validateBody(controller.LoginBodySchema),
    controller.loginController(
      useCase.LoginUseCase(AuthRepository, Encryptor),
      JwtHandler,
    ),
  )

  return router
}
