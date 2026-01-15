# API Service Architecture

This service implements a Domain-Driven Design (DDD) template that combines slice-based boundaries with a hexagonal layering model. Each feature slice encapsulates its own domain, application, and infrastructure code while reusing shared building blocks from `src/core`.

## Directory Layout

```
apps/api
├── src/
│   ├── core/               # Shared abstractions for all slices
│   │   ├── domain/         # Base domain primitives (AggregateRoot, DomainEvent)
│   │   ├── application/    # Cross-slice contracts (UseCase, EventBus)
│   │   └── infrastructure/ # Generic adapters (event bus, DB, error handling)
│   ├── tasks/              # Example slice (feature module)
│   │   ├── domain/         # Task aggregate, errors, domain events
│   │   ├── application/    # Use cases + slice-specific ports
│   │   │   ├── it/         # Split per country (only if necessary) could apply to other layers like domain
│   │   │   ├── es/
│   │   └── infrastrucure/  # Express controllers + persistence adapters
│   ├── users/              # Example slice (feature module)
│   │   ├── domain/         # Task aggregate, errors, domain events
│   │   ├── application/    # Use cases + slice-specific ports
│   │   │   ├── it/         # Split per country (only if necessary)
│   │   │   ├── es/
│   │   └── infrastrucure/  # Express controllers + persistence adapters
│   └── main.ts             # App entry point, route wiring, event registration
└── package.json
```

## Slice Architecture

Each feature lives inside its own slice (`src/<slice-name>`). A slice groups together every element needed to deliver its behavior:

- `domain/` holds aggregates, value objects, and domain-specific errors.
- `application/` exposes use cases and ports that describe the slice's required infrastructure.
- `infrastrucure/` (typo retained from template) contains framework adapters such as HTTP controllers and repositories.

This organization keeps the public API of a slice limited to its application layer, enabling teams to add new slices without modifying shared modules.

### Example: `tasks` Slice

- `domain/task.entity.ts` models the `Task` aggregate and raises domain events.
- `application/use-cases/*.ts` wraps business actions (`CreateTaskUseCase`, `UpdateTaskUseCase`, etc.) and interacts with ports.
- `application/task.repository.port.ts` defines the repository contract.
- `infrastrucure/task.repository.ts` implements the port using in-memory storage.
- `infrastrucure/controllers/*.ts` map HTTP requests to use cases.

## Hexagonal Layers

The hexagonal, or ports-and-adapters, style appears across slices:

- **Domain layer**: Pure business logic with no framework dependencies (`AggregateRoot`, `Task`).
- **Application layer**: Coordinates domain objects and defines ports (`UseCase`, repository ports, `EventBus`).
- **Infrastructure layer**: Implements ports with specific technologies (Express controllers, repository adapters, in-memory event bus).

Dependencies flow inward: infrastructure depends on application, which depends on domain. Shared `core` modules provide reusable abstractions so each slice can focus on its own logic.

## Domain Events Pattern

Domain events propagate changes from aggregates to the outside world while keeping the domain pure.

1. **Declare event shapes**: A slice augments `DomainEventMap` via module augmentation (`tasks/domain/events/task-created.event.ts`).
2. **Raise events**: Aggregates extend `AggregateRoot` and call `addDomainEvent` when significant changes happen (`Task.create`).
3. **Dispatch events**: Application services gather `domainEvents` after persistence and hand them to the `EventBus` (`CreateTaskUseCase`).
4. **Handle events**: Infrastructure registers handlers (`index.ts` registers `SendEmailWhenTaskCreatedEvent`) that react asynchronously.

The default `createInMemoryEventBus` keeps handlers in memory, but the `EventBus` contract allows swapping in other transports (message queues, observers, etc.) without touching domain code.

## Adding a New Slice

1. Duplicate the `tasks` slice structure.
2. Model the aggregate(s) and domain events.
3. Define ports and use cases in the application layer.
4. Implement controllers and adapters in the infrastructure layer.
5. Register routes and event handlers in `src/index.ts`.

By following this pattern, each slice remains cohesive, testable, and decoupled from technical details, while domain events enable cross-cutting workflows across slices.
