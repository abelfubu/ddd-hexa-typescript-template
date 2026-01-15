import { UUID } from 'crypto'
import { RequestHandler } from 'express'

import { UseCase, asyncHandler } from '@core'

export const deleteTaskController = (
  useCase: UseCase<UUID, void>,
): RequestHandler => {
  return asyncHandler(async (req, res) => {
    await useCase.execute(req.body)
    return res.status(200).send()
  })
}
