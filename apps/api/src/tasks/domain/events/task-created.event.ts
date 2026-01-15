import { UUID } from 'crypto'

import { DomainEventMap } from '../../../core/application/events/domain-events'
import { DomainEvent } from '../../../core/domain/domain.event'

declare module '../../../core/application/events/domain-events' {
  interface DomainEventMap {
    'task.created': { taskId: UUID }
  }
}

export function createTaskCreatedEvent(
  id: UUID,
): DomainEvent<DomainEventMap['task.created']> {
  return {
    name: 'task.created',
    occurredAt: new Date(),
    payload: { taskId: id },
  }
}
