import { UUID } from 'crypto'

import { UseCase } from '../../../core/application/use-cases/use-case'
import { TaskRepositoryPort } from '../task.repository.port'

export const ToggleTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<UUID, void> => ({
  execute: async (request) => {
    await repository.toggleDone(request)
  },
})
