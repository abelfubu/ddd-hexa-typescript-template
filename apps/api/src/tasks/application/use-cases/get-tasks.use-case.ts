import { UseCase } from '@core'

import { Task } from '../../domain/task.entity'

import { TaskRepositoryPort } from '../task.repository.port'

export const GetTasksUseCase = (
  repository: TaskRepositoryPort,
): UseCase<void, Task[]> => ({
  execute: () => repository.get(),
})
