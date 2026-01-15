import { UseCase } from '../../../core/application/use-cases/use-case'
import { Task } from '../../domain/task.entity'
import { TaskRepositoryPort } from '../task.repository.port'

export const GetTasksUseCase = (
  repository: TaskRepositoryPort,
): UseCase<void, Task[]> => ({
  execute: () => repository.get(),
})
