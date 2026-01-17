import { AppError } from '@core'
import { UUID } from 'node:crypto'

export const TaskAppError = {
  NotFound: (id: UUID) =>
    AppError.NotFound({
      message: 'Task not found',
      code: 'errors.task.notFound',
      details: [`Task with id ${id} does not exist`],
    }),
}
