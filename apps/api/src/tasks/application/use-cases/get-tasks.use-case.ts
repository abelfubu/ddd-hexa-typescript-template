import { type UseCase } from '@core'

import { Task } from '../../domain/task.entity'

import { type TaskRepositoryPort } from '../task.repository.port'

export const GetTasksUseCase = (
  repository: TaskRepositoryPort,
): UseCase<void, Task[]> => ({
  execute: () => repository.get(),
})
