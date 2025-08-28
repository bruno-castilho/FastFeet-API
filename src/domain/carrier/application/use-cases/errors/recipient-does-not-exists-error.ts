export class RecipientDoesNotExistsError extends Error {
  constructor(id: string) {
    super(`Destinatário "${id}" não existe.`)
  }
}
