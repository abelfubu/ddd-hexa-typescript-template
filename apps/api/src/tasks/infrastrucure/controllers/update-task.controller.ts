import { UUID } from 'crypto'
import { RequestHandler } from 'express'

import { UseCase, asyncHandler } from '@core'

interface UpdateTaskRequest {
  id: UUID
  task: {
    title: string
    description?: string
    completed: boolean
  }
}

export const updateTaskController = (
  useCase: UseCase<UpdateTaskRequest, void>,
): RequestHandler => {
  return asyncHandler(async (req, res) => {
    await useCase.execute({
      id: req.params.id as UUID,
      task: req.body,
    })

    return res.status(204).send()
  })
}
