import { DomainEvent } from './domain.event'

export class AggregateRoot<T> {
  #domainEvents: DomainEvent<unknown>[] = []

  protected constructor(
    readonly id: T,
    readonly createdAt = new Date(),
    readonly updatedAt = new Date(),
  ) {}

  getDomainEvents(): DomainEvent<unknown>[] {
    return this.#domainEvents
  }

  addDomainEvent(domainEvent: DomainEvent<unknown>): void {
    this.#domainEvents.push(domainEvent)
  }

  clearDomainEvents(): void {
    this.#domainEvents = []
  }
}
