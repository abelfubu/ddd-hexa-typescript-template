import { type UUID } from 'node:crypto'

import { type DomainEvent } from '@core'

export function createTaskCreatedEvent(
  id: UUID,
): DomainEvent<{ taskId: UUID }> {
  return {
    name: 'task.created',
    occurredAt: new Date(),
    payload: { taskId: id },
  }
}
