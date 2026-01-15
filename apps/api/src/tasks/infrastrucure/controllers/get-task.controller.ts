import { RequestHandler } from 'express'

import { UseCase } from '../../../core/application/use-cases/use-case'
import { asyncHandler } from '../../../core/infrastructure/async.handler'
import { Task } from '../../domain/task.entity'

export const getTasksController = (
  useCase: UseCase<void, Task[]>,
): RequestHandler => {
  return asyncHandler(async (_req, res) => {
    const tasks = await useCase.execute()
    return res.status(200).json(tasks)
  })
}
