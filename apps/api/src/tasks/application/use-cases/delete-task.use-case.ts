import { UUID } from 'crypto'

import { UseCase } from '@core'

import { TaskRepositoryPort } from '../task.repository.port'

export const DeleteTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<UUID, void> => ({
  execute: async (request) => {
    await repository.delete(request)
  },
})
