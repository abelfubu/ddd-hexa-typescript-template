import { type RequestHandler } from 'express'
import { type UUID } from 'node:crypto'
import z from 'zod'

import { type UseCase, asyncHandler } from '@core'

export const ToggleTasksParamsSchema = z.object({
  id: z.uuid().transform((v) => v as UUID),
})

export const toggleTasksController = (
  useCase: UseCase<UUID, void>,
): RequestHandler<z.infer<typeof ToggleTasksParamsSchema>> => {
  return asyncHandler(async (req, res) => {
    useCase.execute(req.params.id as UUID)
    return res.status(204).send()
  })
}
