export interface DomainEvent<T> {
  readonly name: string
  readonly occurredAt: Date
  readonly payload: T
}
