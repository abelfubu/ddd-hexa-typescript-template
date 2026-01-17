import { DomainEvent } from '../../domain/domain.event'

import { DomainEventKey, DomainEventMap } from './domain-events'

export interface EventHandler<EventName extends DomainEventKey> {
  readonly handle: (
    event: DomainEvent<DomainEventMap[EventName]>,
  ) => Promise<void>
}
