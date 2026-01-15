export interface DomainEventMap {}

export type DomainEventName = keyof DomainEventMap & string

export type DomainEventPayload<EventName extends DomainEventName> =
  DomainEventMap[EventName]
