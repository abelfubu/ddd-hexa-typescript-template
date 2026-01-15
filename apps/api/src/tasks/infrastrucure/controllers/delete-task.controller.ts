import { UUID } from 'crypto'
import { RequestHandler } from 'express'

import { UseCase } from '../../../core/application/use-cases/use-case'
import { asyncHandler } from '../../../core/infrastructure/async.handler'

export const deleteTaskController = (
  useCase: UseCase<UUID, void>,
): RequestHandler => {
  return asyncHandler(async (req, res) => {
    await useCase.execute(req.body)
    return res.status(200).send()
  })
}
