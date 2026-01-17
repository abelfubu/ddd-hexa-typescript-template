import { DomainEvent } from '../../domain/domain.event'

import { DomainEventKey } from './domain-events'
import { EventHandler } from './event.handler'

export interface EventBus {
  register<EventName extends DomainEventKey>(
    event: EventName,
    handler: EventHandler<EventName>,
  ): void
  dispatch(event: DomainEvent<unknown>): void
}
