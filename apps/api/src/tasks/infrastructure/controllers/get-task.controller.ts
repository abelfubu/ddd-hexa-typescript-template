import { type RequestHandler } from 'express'

import { type UseCase, asyncHandler } from '@core'
import { Task } from '../../domain/task.entity'

export const getTasksController = (
  useCase: UseCase<void, Task[]>,
): RequestHandler => {
  return asyncHandler(async (_req, res) => {
    const tasks = await useCase.execute()
    return res.status(200).json(tasks)
  })
}
