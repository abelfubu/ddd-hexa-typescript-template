import { UUID } from 'node:crypto'

import { AppError, UseCase } from '@core'

import { Task } from '../../domain/task.entity'
import { TaskRepositoryPort } from '../task.repository.port'

export const GetOneTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<UUID, Task> => ({
  execute: async (request) => {
    const task = await repository.getOne(request)
    if (!task) {
      throw AppError.NotFound({
        message: 'Task not found',
        code: 'errors.task.notFound',
        details: [`Task with id ${request} does not exist`],
      })
    }

    return task
  },
})
