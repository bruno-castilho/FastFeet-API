export class SessionDoesNotExistsError extends Error {
  constructor(sessionId: string) {
    super(`Sessão “${sessionId}” não existe.`)
  }
}
