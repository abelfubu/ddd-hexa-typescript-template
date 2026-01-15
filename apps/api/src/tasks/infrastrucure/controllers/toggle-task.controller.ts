import { UUID } from 'crypto'
import { RequestHandler } from 'express'

import { UseCase, asyncHandler } from '@core'

export const toggleTasksController = (
  useCase: UseCase<UUID, void>,
): RequestHandler => {
  return asyncHandler(async (req, res) => {
    useCase.execute(req.params.id as UUID)
    return res.status(204).send()
  })
}
