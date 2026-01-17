import { UUID } from 'node:crypto'

import { UseCase } from '@core'

import { TaskRepositoryPort } from '../task.repository.port'

export const ToggleTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<UUID, void> => ({
  execute: async (request) => {
    await repository.toggleDone(request)
  },
})
