import { type UUID } from 'node:crypto'

declare module '../../core/application/events/domain-events' {
  interface DomainEventMap {
    'task.created': { taskId: UUID }
  }
}

export {}
