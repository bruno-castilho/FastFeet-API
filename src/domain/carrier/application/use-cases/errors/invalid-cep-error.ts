export class InvalidCEP extends Error {
  constructor() {
    super('CEP inválido.')
  }
}
