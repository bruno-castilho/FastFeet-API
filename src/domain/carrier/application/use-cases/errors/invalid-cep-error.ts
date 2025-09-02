export class InvalidCEPError extends Error {
  constructor() {
    super('CEP inválido.')
  }
}
