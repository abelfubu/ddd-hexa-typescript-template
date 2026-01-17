import { UUID } from 'node:crypto'

import { DomainEvent } from '../../../core/domain/domain.event'

export function createTaskCreatedEvent(
  id: UUID,
): DomainEvent<{ taskId: UUID }> {
  return {
    name: 'task.created',
    occurredAt: new Date(),
    payload: { taskId: id },
  }
}
