import { DomainError } from '../../core/domain/domain.error'

export const TaskError = {
  InvalidTitle: () =>
    DomainError.create({
      message: 'Invalid task title',
      code: 'errors.task.invalidTitle',
      details: ['Task title must be at least 4 characters long.'],
    }),
}
