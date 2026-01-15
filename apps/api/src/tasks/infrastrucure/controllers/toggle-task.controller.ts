import { UUID } from 'crypto'
import { RequestHandler } from 'express'

import { UseCase } from '../../../core/application/use-cases/use-case'
import { asyncHandler } from '../../../core/infrastructure/async.handler'

export const toggleTasksController = (
  useCase: UseCase<UUID, void>,
): RequestHandler => {
  return asyncHandler(async (req, res) => {
    useCase.execute(req.params.id as UUID)
    return res.status(204).send()
  })
}
