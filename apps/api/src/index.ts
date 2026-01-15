import express, { json } from 'express'
import { EventHandler } from './core/application/events/event.handler'
import { createInMemoryEventBus } from './core/infrastructure/events/in-memory-event.bus'
import { globalErrorHandler } from './core/infrastructure/global-error.handler'
import { buildTaskRoutes } from './tasks/infrastrucure/task.routes'

const app = express()
const eventBus = createInMemoryEventBus()

// Example event handler registration
// This should be registered in the email send domain module
const SendEmailWhenTaskCreatedEvent: EventHandler<'task.created'> = {
  handle: async (event) => {
    console.log('[SUBSCRIBED TO TASK CREATED EVENT]', event)
  },
}
eventBus.register('task.created', SendEmailWhenTaskCreatedEvent)
app.use(json())

app.get('/ping', (_req, res) => {
  res.status(200).json({ message: 'pong!' })
})

app.use('/api/tasks', buildTaskRoutes(eventBus))

app.use(globalErrorHandler)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
