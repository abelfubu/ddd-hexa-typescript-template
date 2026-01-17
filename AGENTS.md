# Agent Guidelines for ddd-hexa-template

## High-Level Architecture

- The repo showcases DDD with hexagonal layering. Each slice under `apps/api/src/<slice>` contains `domain`, `application`, and `infrastructure` subfolders.
- `apps/api/src/core` exposes reusable building blocks (domain primitives, ports, handlers). Treat these as shared abstractions; avoid importing across slices except through `@core` exports.
- HTTP bootstrapping lives in `apps/api/src/api/express` and `apps/api/src/main.ts`. Keep framework-specific logic there and inject dependencies (event bus, middleware, adapters) into slices.

## Working in Slices

- Within a slice, never reach directly into another slice’s folders. Use that slice’s public exports (`index.ts`) to access contracts or adapters.
- Controllers should depend on ports/use cases only. Pass infrastructure implementations (repositories, services) when building routes (see `task.routes.ts`).

## Error Handling Expectations

- Controllers must wrap async logic with `asyncHandler` so exceptions propagate to the global error middleware.
- Prefer rich error objects extending a `DomainError`/`AppError` type (status, code, message) over raw `Error`. Global handlers translate these into consistent HTTP responses and log internals with `pino`.
- Validation utilities (`validateBody`, `validateParams`, `validateQuery`) should return `{ ok: false, errors: string[] }`. Keep this response shape consistent across new validators.
- When adding middleware, register pre-route middleware before routes and error middleware (e.g., `globalErrorHandler`) after routes in `createApplication` options.

## Event & Domain Guidance

- Domain events extend `DomainEventMap` via module augmentation. Register handlers in `main.ts` only as examples; real features should register inside their slice-specific bootstrap to keep cross-slice coupling low.
- Aggregates should raise domain events through `AggregateRoot.addDomainEvent` and clear them after dispatch.

## Coding Style

- Use TypeScript, keep imports path-alias friendly (via existing tsconfig paths).
- Avoid inline comments unless clarifying domain rules. Favor descriptive naming over abbreviations.
- Align with existing lint/prettier configuration; no extra formatting tools.

## Testing & Validation

- Prefer slice-level unit tests (use cases, domain) and adapter tests for infrastructure. Hook into existing scripts before adding new tooling.
- When adding persistence or external integration, define a port interface in the slice application layer and implement in infrastructure.

These guidelines should help future agents maintain alignment with the repo’s DDD + hexagonal template goals while extending functionality safely.
