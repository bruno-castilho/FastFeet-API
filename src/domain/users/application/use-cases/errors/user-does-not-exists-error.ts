export class UserDoesNotExistsError extends Error {
  constructor(userId: string) {
    super(`Usuário “${userId}” não existe.`)
  }
}
