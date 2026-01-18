import { type DomainEvent } from '../../domain/domain.event'

import { type DomainEventKey } from './domain-events'
import { type EventHandler } from './event.handler'

export interface EventBus {
  register<EventName extends DomainEventKey>(
    event: EventName,
    handler: EventHandler<EventName>,
  ): void
  dispatch(event: DomainEvent<unknown>): void
}
