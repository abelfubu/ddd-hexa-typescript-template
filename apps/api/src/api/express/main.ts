import express, {
    type ErrorRequestHandler,
    type RequestHandler,
    Router,
} from 'express'
import { IncomingMessage, Server, ServerResponse } from 'node:http'

export function createApplication({
  port,
  middleware,
  routes,
}: {
  port: number
  middleware: {
    preRoutes: RequestHandler[]
    postRoutes: (RequestHandler | ErrorRequestHandler)[]
  }
  routes: Record<string, Router>
}): Server<typeof IncomingMessage, typeof ServerResponse> {
  const app = express()

  for (const mid of middleware.preRoutes) {
    app.use(mid)
  }

  for (const [path, router] of Object.entries(routes)) {
    app.use(path, router)
  }

  for (const mid of middleware.postRoutes) {
    app.use(mid)
  }

  return app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
  })
}
