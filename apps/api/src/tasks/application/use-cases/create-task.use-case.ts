import { EventBus, UseCase } from '@core'

import { Task } from '../../domain/task.entity'
import { TaskRepositoryPort } from '../task.repository.port'

type CreateTaskRequest = Pick<Task, 'title' | 'description' | 'userId'>

export const CreateTaskUseCase = (
  repository: TaskRepositoryPort,
  eventBus: EventBus,
): UseCase<CreateTaskRequest, Task> => ({
  execute: async ({ title, description, userId }) => {
    const task = Task.create(title, description ?? '', false, userId)
    const newTask = await repository.save(task)

    newTask.getDomainEvents().forEach((event) => eventBus.dispatch(event))
    newTask.clearDomainEvents()

    return newTask
  },
})
