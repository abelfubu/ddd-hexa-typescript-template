import { UUID } from 'node:crypto'

import { UseCase } from '@core'

import { Task } from '../../domain/task.entity'
import { TaskAppError } from '../task.app-error'
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
      throw TaskAppError.NotFound(id)
    }

    const updatedTask = await repository.update(id, task)
    return updatedTask
  },
})
