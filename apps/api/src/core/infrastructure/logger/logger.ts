import pino from 'pino'
import pinoHttp from 'pino-http'

export function logger() {
  return pinoHttp({ logger: pino({ level: 'info' }) })
}
