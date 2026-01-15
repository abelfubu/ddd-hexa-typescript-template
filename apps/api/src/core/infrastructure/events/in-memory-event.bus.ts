import { DomainEvent } from '../../domain/domain.event'

import {
    DomainEventMap,
    DomainEventName,
} from '../../application/events/domain-events'
import { EventBus } from '../../application/events/event.bus'
import { EventHandler } from '../../application/events/event.handler'

export function createInMemoryEventBus(): EventBus {
  const handlers = new Map<DomainEventName, EventHandler<DomainEventName>[]>()

  return {
    register<EventName extends DomainEventName>(
      event: EventName,
      handler: EventHandler<EventName>,
    ): void {
      const found = handlers.get(event)
      if (found) {
        handlers.set(event, [...found, handler])
        return
      }

      handlers.set(event, [handler])
    },

    dispatch<EventName extends DomainEventName>(
      event: DomainEvent<DomainEventMap[EventName]>,
    ): void {
      const found = handlers.get(event.name as EventName)

      if (!found) {
        throw new Error(`No handlers for event: ${event.name}`)
      }

      found.forEach((handler) => handler.handle(event))
    },
  }
}
