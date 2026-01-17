import { UUID } from 'node:crypto'
import { RequestHandler } from 'express'
import z from 'zod'

import { UseCase, asyncHandler } from '@core'

import { Task } from '../../domain/task.entity'

export const CreateTaskBodySchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
})

interface CreateTaskRequest {
  title: string
  description?: string
  userId: UUID
}

export const createTaskController = (
  useCase: UseCase<CreateTaskRequest, Task>,
): RequestHandler<
  NonNullable<unknown>,
  NonNullable<unknown>,
  z.infer<typeof CreateTaskBodySchema>
> => {
  return asyncHandler(async (req, res) => {
    const task = await useCase.execute({
      ...req.body,
      userId: req.context.userId,
    })
    return res.status(201).json(task)
  })
}
