import { AppError } from '../../application/errors/app.error'
import {
  type DomainEventKey,
  type DomainEventMap,
} from '../../application/events/domain-events'
import { type EventBus } from '../../application/events/event.bus'
import { type EventHandler } from '../../application/events/event.handler'
import { type DomainEvent } from '../../domain/domain.event'

export function createInMemoryEventBus(): EventBus {
  const handlers = new Map<DomainEventKey, EventHandler<DomainEventKey>[]>()

  return {
    register(
      event: DomainEventKey,
      handler: EventHandler<DomainEventKey>,
    ): void {
      const found = handlers.get(event)
      if (found) {
        handlers.set(event, [...found, handler])
        return
      }

      handlers.set(event, [handler])
    },

    dispatch(event): void {
      const found = handlers.get(event.name as DomainEventKey)

      if (!found) {
        throw AppError.InternalServerError({
          details: [`No handlers for event: ${event.name}`],
        })
      }

      found.forEach((handler) =>
        handler.handle(event as DomainEvent<DomainEventMap[DomainEventKey]>),
      )
    },
  }
}
