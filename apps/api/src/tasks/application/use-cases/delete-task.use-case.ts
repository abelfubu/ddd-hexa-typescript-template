import { type UUID } from 'node:crypto'

import { type UseCase } from '@core'

import { type TaskRepositoryPort } from '../task.repository.port'

export const DeleteTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<UUID, void> => ({
  execute: async (request) => {
    await repository.delete(request)
  },
})
