import { UUID } from 'node:crypto'

import { AppError, UseCase } from '@core'

import { Task } from '../../domain/task.entity'
import { TaskRepositoryPort } from '../task.repository.port'

export const UpdateTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<
  { id: UUID; task: Pick<Task, 'title' | 'description' | 'completed'> },
  void
> => ({
  execute: async ({ id, task }) => {
    const found = await repository.getOne(id)
    if (!found) {
      throw AppError.NotFound({
        message: 'Task not found',
        code: 'errors.task.notFound',
        details: [`Task with id ${id} does not exist`],
      })
    }

    const updatedTask = await repository.update(id, task)
    return updatedTask
  },
})
