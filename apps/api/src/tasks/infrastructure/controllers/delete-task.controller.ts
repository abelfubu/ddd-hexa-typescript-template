import { RequestHandler } from 'express'
import { UUID } from 'node:crypto'
import z from 'zod'

import { UseCase, asyncHandler } from '@core'

export const DeleteTaskParamsSchema = z.object({
  id: z.uuid().transform((v) => v as UUID),
})

export const deleteTaskController = (
  useCase: UseCase<UUID, void>,
): RequestHandler<z.infer<typeof DeleteTaskParamsSchema>> => {
  return asyncHandler(async (req, res) => {
    await useCase.execute(req.params.id as UUID)
    return res.status(200).send()
  })
}
