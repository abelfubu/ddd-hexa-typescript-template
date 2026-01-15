import { UUID } from 'crypto'
import { RequestHandler } from 'express'

import { UseCase } from '../../../core/application/use-cases/use-case'
import { asyncHandler } from '../../../core/infrastructure/async.handler'
import { Task } from '../../domain/task.entity'

export const getOneTaskController = (
  useCase: UseCase<UUID, Task | null>,
): RequestHandler => {
  return asyncHandler(async (req, res) => {
    const task = await useCase.execute(req.params.id as UUID)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    return res.status(200).json(task)
  })
}
