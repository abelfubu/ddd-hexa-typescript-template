export interface JwtHandlerPort {
  sign: (payload: object) => string
  verify: <T>(token: string) => T
}
