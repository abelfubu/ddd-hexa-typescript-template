import { type RequestHandler } from 'express'
import { type UUID } from 'node:crypto'
import z from 'zod'

import { type UseCase, asyncHandler } from '@core'

export const UpdateTaskParamsSchema = z.object({
  id: z.uuid().transform((v) => v as UUID),
})

export const UpdateTaskBodySchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  completed: z.boolean(),
})

interface UpdateTaskRequest {
  id: UUID
  task: {
    title: string
    description?: string
    completed: boolean
  }
}

export const updateTaskController = (
  useCase: UseCase<UpdateTaskRequest, void>,
): RequestHandler<
  z.infer<typeof UpdateTaskParamsSchema>,
  NonNullable<unknown>,
  z.infer<typeof UpdateTaskBodySchema>
> => {
  return asyncHandler(async (req, res) => {
    await useCase.execute({
      id: req.params.id as UUID,
      task: req.body,
    })

    return res.status(204).send()
  })
}
