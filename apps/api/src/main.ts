import { json } from 'express'

import { createApplication } from '@api'
import { createInMemoryEventBus, EventHandler, globalErrorHandler } from '@core'

import { buildTaskRoutes } from '@tasks'

const eventBus = createInMemoryEventBus()
// Example event handler registration
// This should be registered in the email send domain module
const SendEmailWhenTaskCreatedEvent: EventHandler<'task.created'> = {
  handle: async (event) => {
    console.log('[SUBSCRIBED TO TASK CREATED EVENT]', event)
  },
}
eventBus.register('task.created', SendEmailWhenTaskCreatedEvent)

createApplication({
  port: 3000,
  middleware: { preRoutes: [json()], postRoutes: [globalErrorHandler] },
  routes: {
    '/api/tasks': buildTaskRoutes(eventBus),
  },
})

process.on('SIGINT', () => {
  console.log('Shutting down server...')
  process.exit()
})
