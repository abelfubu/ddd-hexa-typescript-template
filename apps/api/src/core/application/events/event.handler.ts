import { type DomainEvent } from '../../domain/domain.event'

import { type DomainEventKey, type DomainEventMap } from './domain-events'

export interface EventHandler<EventName extends DomainEventKey> {
  readonly handle: (
    event: DomainEvent<DomainEventMap[EventName]>,
  ) => Promise<void>
}
