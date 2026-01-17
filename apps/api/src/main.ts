import cookieParser from 'cookie-parser'
import cors from 'cors'
import { json } from 'express'

import { createApplication } from '@api'
import {
    createInMemoryEventBus,
    EventHandler,
    globalErrorHandler,
    JwtHandler,
} from '@core'

import { authMiddleware, buildAuthRoutes } from '@auth'
import { buildTaskRoutes } from '@tasks'
import pino from 'pino'
import pinoHttp from 'pino-http'

const eventBus = createInMemoryEventBus()
// Example event handler registration
// This should be registered in the email send domain module
const SendEmailWhenTaskCreatedEvent: EventHandler<'task.created'> = {
  handle: async (event) => {
    console.log('[SUBSCRIBED TO TASK CREATED EVENT]', event)
  },
}
eventBus.register('task.created', SendEmailWhenTaskCreatedEvent)

const port = process.env.PORT ? Number(process.env.PORT) : 3000
createApplication({
  middleware: {
    preRoutes: [
      json(),
      cors(),
      cookieParser(),
      pinoHttp({ logger: pino({ level: 'info' }) }),
    ],
    postRoutes: [globalErrorHandler],
  },
  port,
  routes: {
    '/api/tasks': buildTaskRoutes(eventBus, authMiddleware(JwtHandler)),
    '/auth': buildAuthRoutes(),
  },
})

process.on('SIGINT', () => {
  console.log('Shutting down server...')
  process.exit()
})
