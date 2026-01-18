import { type UUID } from 'node:crypto'

import { type UseCase } from '@core'

import { Task } from '../../domain/task.entity'
import { TaskAppError } from '../task.app-error'
import { type TaskRepositoryPort } from '../task.repository.port'

export const GetOneTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<UUID, Task> => ({
  execute: async (request) => {
    const task = await repository.getOne(request)
    if (!task) {
      throw TaskAppError.NotFound(request)
    }

    return task
  },
})
