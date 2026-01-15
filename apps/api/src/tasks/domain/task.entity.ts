import { UUID, randomUUID } from 'crypto'

import { AggregateRoot } from '../../core/domain/aggregate-root.entity'
import { createTaskCreatedEvent } from './events/task-created.event'
import { TaskErrors } from './task.errors'

export class Task extends AggregateRoot<UUID> {
  private constructor(
    readonly title: string,
    readonly description: string,
    readonly completed: boolean,
    readonly userId = '8a906d8b-8499-4260-965d-6b27e4ede2a8',
  ) {
    super(randomUUID())
  }

  static create(title: string, description: string, completed: boolean): Task {
    if (!title || title.trim().length < 4) {
      throw new Error(TaskErrors.InvalidTitle)
    }

    const task = new Task(title, description ?? '', completed)

    task.addDomainEvent(createTaskCreatedEvent(task.id))

    return task
  }
}
