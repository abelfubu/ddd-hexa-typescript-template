import { EventBus, UseCase } from '@core'

import { Task } from '../../domain/task.entity'
import { TaskRepositoryPort } from '../task.repository.port'

type CreateTaskRequest = Pick<Task, 'title' | 'description'>

export const CreateTaskUseCase = (
  repository: TaskRepositoryPort,
  eventBus: EventBus,
): UseCase<CreateTaskRequest, Task> => ({
  execute: async (request) => {
    const task = Task.create(request.title, request.description ?? '', false)
    const newTask = await repository.save(task)

    newTask.getDomainEvents().forEach((event) => eventBus.dispatch(event))
    newTask.clearDomainEvents()

    return newTask
  },
})
