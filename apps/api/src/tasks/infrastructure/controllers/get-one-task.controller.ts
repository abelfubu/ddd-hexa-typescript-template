import { type RequestHandler } from 'express'
import { type UUID } from 'node:crypto'
import z from 'zod'

import { type UseCase, asyncHandler } from '@core'

import { Task } from '../../domain/task.entity'

export const GetOneTaskParamsSchema = z.object({
  id: z.uuid().transform((v) => v as UUID),
})

export const getOneTaskController = (
  useCase: UseCase<UUID, Task | null>,
): RequestHandler<z.infer<typeof GetOneTaskParamsSchema>> => {
  return asyncHandler(async (req, res) => {
    const task = await useCase.execute(req.params.id)
    return res.status(200).json(task)
  })
}
