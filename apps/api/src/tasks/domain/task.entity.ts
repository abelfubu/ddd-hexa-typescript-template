import { type UUID, randomUUID } from 'node:crypto'

import { AggregateRoot } from '@core'
import { createTaskCreatedEvent } from './events/task-created.event'
import { TaskError } from './task.error'

export class Task extends AggregateRoot<UUID> {
  private constructor(
    readonly title: string,
    readonly description: string,
    readonly completed: boolean,
    readonly userId: UUID,
  ) {
    super(randomUUID())
  }

  static create(
    title: string,
    description: string,
    completed: boolean,
    userId: UUID,
  ): Task {
    if (!title || title.trim().length < 4) {
      throw TaskError.InvalidTitle()
    }

    const task = new Task(title, description ?? '', completed, userId)

    task.addDomainEvent(createTaskCreatedEvent(task.id))

    return task
  }
}
