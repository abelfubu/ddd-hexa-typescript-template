import {
    DomainEventMap,
    DomainEventName,
} from '../../application/events/domain-events'
import { EventBus } from '../../application/events/event.bus'
import { EventHandler } from '../../application/events/event.handler'
import { DomainEvent } from '../../domain/domain.event'

export function createInMemoryEventBus(): EventBus {
  const handlers = new Map<DomainEventName, EventHandler<DomainEventName>[]>()

  return {
    register(
      event: DomainEventName,
      handler: EventHandler<DomainEventName>,
    ): void {
      const found = handlers.get(event)
      if (found) {
        handlers.set(event, [...found, handler])
        return
      }

      handlers.set(event, [handler])
    },

    dispatch(event): void {
      const found = handlers.get(event.name as DomainEventName)

      if (!found) {
        throw new Error(`No handlers for event: ${event.name}`)
      }

      found.forEach((handler) =>
        handler.handle(event as DomainEvent<DomainEventMap[DomainEventName]>),
      )
    },
  }
}
