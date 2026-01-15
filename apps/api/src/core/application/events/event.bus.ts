import { DomainEvent } from '../../domain/domain.event'

import { DomainEventMap, DomainEventName } from './domain-events'
import { EventHandler } from './event.handler'

export interface EventBus {
  register<EventName extends DomainEventName>(
    event: EventName,
    handler: EventHandler<EventName>,
  ): void
  dispatch<EventName extends DomainEventName>(
    event: DomainEvent<DomainEventMap[EventName]>,
  ): void
}
