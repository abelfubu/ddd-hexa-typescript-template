import { RequestHandler } from 'express'

import { UseCase } from '../../../core/application/use-cases/use-case'
import { asyncHandler } from '../../../core/infrastructure/async.handler'
import { Task } from '../../domain/task.entity'

interface CreateTaskRequest {
  title: string
  description?: string
}

export const createTaskController = (
  useCase: UseCase<CreateTaskRequest, Task>,
): RequestHandler => {
  return asyncHandler(async (req, res) => {
    const task = await useCase.execute(req.body)
    return res.status(201).json(task.toObject())
  })
}
