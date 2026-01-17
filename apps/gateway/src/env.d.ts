declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'test' | 'production'
    PORT: string
    TASKS_SERVICE_URL: string
    AUTH_SERVICE_URL: string
  }
}
