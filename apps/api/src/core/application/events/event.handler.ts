import { DomainEvent } from '../../domain/domain.event'

import { DomainEventMap, DomainEventName } from './domain-events'

export interface EventHandler<EventName extends DomainEventName> {
  readonly handle: (
    event: DomainEvent<DomainEventMap[EventName]>,
  ) => Promise<void>
}
