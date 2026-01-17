import { UUID, randomUUID } from 'node:crypto'

import { AggregateRoot } from '../../core/domain/aggregate-root.entity'
import { createTaskCreatedEvent } from './events/task-created.event'
import { TaskErrors } from './task.errors'

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
      throw new Error(TaskErrors.InvalidTitle)
    }

    const task = new Task(title, description ?? '', completed, userId)

    task.addDomainEvent(createTaskCreatedEvent(task.id))

    return task
  }
}
