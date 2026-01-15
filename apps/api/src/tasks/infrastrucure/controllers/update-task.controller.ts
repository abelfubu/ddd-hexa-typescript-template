import { UUID } from 'crypto'
import { RequestHandler } from 'express'

import { UseCase } from '../../../core/application/use-cases/use-case'
import { asyncHandler } from '../../../core/infrastructure/async.handler'

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
    await useCase.execute(req.body)
    return res.status(204).send()
  })
}
