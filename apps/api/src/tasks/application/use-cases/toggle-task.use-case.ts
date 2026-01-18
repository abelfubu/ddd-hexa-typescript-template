import { type UUID } from 'node:crypto'

import { type UseCase } from '@core'

import { TaskAppError } from '../task.app-error'
import { type TaskRepositoryPort } from '../task.repository.port'

export const ToggleTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<UUID, void> => ({
  execute: async (request) => {
    const task = await repository.getOne(request)
    if (!task) {
      throw TaskAppError.NotFound(request)
    }

    await repository.toggleDone(request)
  },
})
