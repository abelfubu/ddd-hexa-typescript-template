import { UUID } from 'node:crypto'

import { AppError, UseCase } from '@core'

import { TaskRepositoryPort } from '../task.repository.port'

export const ToggleTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<UUID, void> => ({
  execute: async (request) => {
    const task = await repository.getOne(request)
    if (!task) {
      throw AppError.NotFound({
        message: 'Task not found',
        code: 'errors.task.notFound',
        details: [`Task with id ${request} does not exist`],
      })
    }

    await repository.toggleDone(request)
  },
})
