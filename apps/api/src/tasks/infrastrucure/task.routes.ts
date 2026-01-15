import { Router } from 'express'

import { EventBus } from '../../core/application/events/event.bus'
import * as useCase from '../application/use-cases'
import * as controller from './controllers'
import { TaskRepository } from './task.repository'

export function buildTaskRoutes(eventBus: EventBus) {
  const router = Router()

  router.get(
    '/',
    controller.getTasksController(useCase.GetTasksUseCase(TaskRepository)),
  )
  router.post(
    '/',
    controller.createTaskController(
      useCase.CreateTaskUseCase(TaskRepository, eventBus),
    ),
  )
  router.get(
    '/:id',
    controller.getOneTaskController(useCase.GetOneTaskUseCase(TaskRepository)),
  )
  router.put(
    '/:id',
    controller.updateTaskController(useCase.UpdateTaskUseCase(TaskRepository)),
  )
  router.delete(
    '/:id',
    controller.deleteTaskController(useCase.DeleteTaskUseCase(TaskRepository)),
  )
  router.put(
    '/:id/toggle',
    controller.toggleTasksController(useCase.ToggleTaskUseCase(TaskRepository)),
  )

  return router
}
