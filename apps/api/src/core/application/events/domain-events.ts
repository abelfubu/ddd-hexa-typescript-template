export interface DomainEventMap {}

export type DomainEventKey = keyof DomainEventMap & string

export type DomainEventPayload<EventName extends DomainEventKey> =
  DomainEventMap[EventName]
