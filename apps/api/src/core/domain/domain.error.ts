export class DomainError extends Error {
  private constructor(
    readonly message: string,
    readonly code: string,
    readonly details: string[] = [],
  ) {
    super(message)
  }

  static isDomainError(err: unknown): err is DomainError {
    return err instanceof DomainError
  }

  static create({
    message,
    code,
    details = [],
  }: {
    message: string
    code: string
    details?: string[]
  }): DomainError {
    return new DomainError(message, code, details)
  }
}
