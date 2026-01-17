import { Hono } from 'hono';
import { proxy } from 'hono/proxy';

export function configureProxyServices(
  app: Hono,
  services: Record<string, { uri: string; options?: Record<string, unknown> }>,
) {
  for (const [path, { uri, options }] of Object.entries(services)) {
    app.all(path, (c) => {
      const url = `${new URL(uri).origin}${new URL(c.req.url).pathname}`
      console.log('[URL]', url)
      return proxy(url, {
        ...options,
        method: c.req.method,
        headers: c.req.header(),
        body: c.req.raw.body,
      })
    })
  }
}
