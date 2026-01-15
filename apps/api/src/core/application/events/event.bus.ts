import { DomainEvent } from '../../domain/domain.event'

import { DomainEventName } from './domain-events'
import { EventHandler } from './event.handler'

export interface EventBus {
  register<EventName extends DomainEventName>(
    event: EventName,
    handler: EventHandler<EventName>,
  ): void
  dispatch(event: DomainEvent<unknown>): void
}
