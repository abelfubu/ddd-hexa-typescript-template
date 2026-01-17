import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { configureProxyServices } from './configure-proxy.js'

const app = new Hono()

app.use(cors(), logger())

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

configureProxyServices(app, {
  '/api/tasks/*': {
    uri: process.env.TASKS_SERVICE_URL,
    options: { credentials: 'include' },
  },
  '/auth/*': {
    uri: process.env.AUTH_SERVICE_URL,
    options: { credentials: 'include' },
  },
})

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
