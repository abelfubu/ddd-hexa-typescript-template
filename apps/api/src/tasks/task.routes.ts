import { RequestHandler, Router } from 'express'

import { validateBody, validateParams } from '@core'
import { EventBus } from '../core/application/events/event.bus'
import * as useCase from './application/use-cases'
import * as controller from './infrastrucure/controllers'
import { TaskRepository } from './infrastrucure/task.repository'

export function buildTaskRoutes(
  eventBus: EventBus,
  authMiddleware: RequestHandler,
) {
  const router = Router()

  router.use(authMiddleware)
  router.get(
    '/',
    controller.getTasksController(useCase.GetTasksUseCase(TaskRepository)),
  )
  router.post(
    '/',
    validateBody(controller.CreateTaskBodySchema),
    controller.createTaskController(
      useCase.CreateTaskUseCase(TaskRepository, eventBus),
    ),
  )
  router.get(
    '/:id',
    validateParams(controller.GetOneTaskParamsSchema),
    controller.getOneTaskController(useCase.GetOneTaskUseCase(TaskRepository)),
  )
  router.put(
    '/:id',
    validateParams(controller.UpdateTaskParamsSchema),
    validateBody(controller.UpdateTaskBodySchema),
    controller.updateTaskController(useCase.UpdateTaskUseCase(TaskRepository)),
  )
  router.delete(
    '/:id',
    validateParams(controller.DeleteTaskParamsSchema),
    controller.deleteTaskController(useCase.DeleteTaskUseCase(TaskRepository)),
  )
  router.put(
    '/:id/toggle',
    validateParams(controller.ToggleTasksParamsSchema),
    controller.toggleTasksController(useCase.ToggleTaskUseCase(TaskRepository)),
  )

  return router
}
