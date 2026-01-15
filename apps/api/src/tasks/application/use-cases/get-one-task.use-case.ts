import { UUID } from 'crypto'
import { UseCase } from '../../../core/application/use-cases/use-case'
import { Task } from '../../domain/task.entity'
import { TaskRepositoryPort } from '../task.repository.port'

export const GetOneTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<UUID, Task | null> => ({
  execute: async (request) => repository.getOne(request),
})
