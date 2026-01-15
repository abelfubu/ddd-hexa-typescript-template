import { UUID } from 'crypto'
import { UseCase } from '../../../core/application/use-cases/use-case'
import { Task } from '../../domain/task.entity'
import { TaskRepositoryPort } from '../task.repository.port'

export const UpdateTaskUseCase = (
  repository: TaskRepositoryPort,
): UseCase<
  { id: UUID; task: Pick<Task, 'title' | 'description' | 'completed'> },
  void
> => ({
  execute: async ({ id, task }) => {
    const updatedTask = await repository.update(id, task)
    return updatedTask
  },
})
